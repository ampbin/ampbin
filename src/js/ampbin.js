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
  constructor(database) {
    this.database = database;

    if(window.location.hash) {
      this.load(window.location.hash);
    } else {
      this.save(true);
    }

  }

  load(entryId) {
    console.log('loading: ' + entryId);
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

    console.log('new bin created');
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
