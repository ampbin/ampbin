/**
 * Ampbin class
 *
 * Controller
 */
export class Ampbin {
  /**
   * Ampbin construct
   * 
   * @param  {Database} database Dependency Injection of Database class
   */
  constructor(database, notifications, options) {
    this.database = database;
    this.notifications = notifications;
    this.openBin(options);
    this.loggedIn = false;
  }

  setDatabase(database) {
    this.database = database;
  }

  openBin(options, location = 'bins') {
    if(window.location.hash) {
      let id = window.location.hash.replace('#', '');
      let response = this.database.retrieveOnce('/' + location + '/' + id);
      this.bin = this.database.getRef('/' + location + '/' + id);

      response.then((s) => {
        options.files[0].content = s.val().bin;
        this.loadBin(options);
      });
      this.newbin = false;
    } else {
      options.files[0].url = '/start.html';
      this.loadBin(options);
      this.newbin = true;
      this.userId = '';
    }
  }

  loadBin(options) {
    let jotted = new Jotted(document.querySelector('#editor'), options);
  }

  /**
   * Save the current bin
   *
   * Not sure if this needs a paraemter, but leaving it for now.
   */
  save(newBin = false) {
    let binText = this.getById('copy').value;

    let obj = {
      'bin': binText,
      'timestamp': Date.now(),
      'newbin': newBin
    };

    this.bin = this.database.push(obj);

    window.history.replaceState(null, null, '#' + this.bin.getKey());

    this.notifications.show('Saved!');
    this.saveEl.onclick = () => this.update(); // switch save handler to update

    if(this.loggedIn) {
      this.saveForUser(this.bin.getKey());
    }
  }

  saveForUser(binKey) {
    let uid = firebase.auth().currentUser.uid;
    let db = this.database.getRef('/user_bins/' + uid);
    db.push({
      'bin_id': binKey
    });
  }

  update() {
    let binText = this.getById('copy').value;

    let obj = {
      'bin': binText,
      'timestamp': Date.now(),
      'newbin': false
    };

    this.bin.update(obj);

    this.notifications.show('Updated!');
  }

  /**
   * Listen for a click on the save button
   * 
   * @param {String} saveId ID of the Save button
   */
  addSaveHandler(saveId = 'save') {
    this.saveEl = this.getById(saveId);
    if(this.newbin) {
      this.saveEl.onclick = () => this.save();
    } else {
      this.saveEl.onclick = () => this.update();
    }    
  }

  /**
   * Get element by ID
   * @param  {String}  elId ID of the element
   * @return {Element}      Element Object
   */
  getById(elId) {
    return document.getElementById(elId);
  }

}
