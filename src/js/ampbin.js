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
  constructor(database, options) {
    this.database = database;

    if(window.location.hash) {
      let response = this.load(window.location.hash.replace('#', ''));

      response.then((s) => {
        options.files[0].content = s.val().bin;
        this.loadBin(options);
      });
      
    } else {
      options.files[0].url = '/start.html';
      this.loadBin(options);
      this.save(true);
    }
    
  }

  loadBin(options) {
    let jotted = new Jotted(document.querySelector('#editor'), options);
  }

  load(entryId) {
    let response = firebase.database().ref('/bins/' + entryId).once('value');

    return response;
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
  }

  update() {
    let binText = this.getById('copy').value;

    let obj = {
      'bin': binText,
      'timestamp': Date.now(),
      'newbin': false
    };

    this.bin.update(obj);
  }

  /**
   * Listen for a click on the save button
   * 
   * @param {String} saveId ID of the Save button
   */
  addSaveHandler(saveId = 'save') {
    let saveEl = this.getById(saveId);
    saveEl.onclick = () => this.update();
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
