var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

var config = {
  apiKey: "AIzaSyBYkQt6uTnx1WqCJRbFh-58u3IGF2OtEPc",
  authDomain: "levilol-9594e.firebaseapp.com",
  databaseURL: "https://levilol-9594e.firebaseio.com",
  projectId: "levilol-9594e",
  storageBucket: "levilol-9594e.appspot.com",
  messagingSenderId: "331064834157"
};
firebase.initializeApp(config);

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
