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

class Controller {
  static addClickListener(elId, cb) {
    let el = Controller.getById(elId);
    el.onclick = cb;
  }

  static getById(elId) {
    return document.getElementById(elId);
  }
}

class Ampbin {
  
  constructor(db) {
    this.db = db;
  }

  save() {
    console.log('hi');
  }

}

let database = new Database('bins');
let ampbin = new Ampbin(database);
let save = Controller.addClickListener('save', ampbin.save);
