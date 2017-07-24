class Database {
  constructor(ref) {
    this.db = firebase.database().ref(ref);
  }

  set(obj) {
    this.db.set(obj);
  }

  push(obj) {
    this.db.push(obj);
  }
}

class Ampbin {
  
  constructor(database) {
    this.database = database;
  }

  save() {
    // TODO: find better way to do this
    let $editors = jotted.$container.querySelectorAll('.jotted-editor');
    let binText = $editors[0].textContent;

    let obj = {
      'bin': binText,
      'timestamp': Date.now()
    };

    this.database.push(obj);
  }

  addSaveHandler(saveId = 'save') {
    let saveEl = this.getById(saveId);
    saveEl.onclick = () => this.save();
  }

  getById(elId) {
    return document.getElementById(elId);
  }

}

let db = new Database('bins');
let ampbin = new Ampbin(db);
ampbin.addSaveHandler();
