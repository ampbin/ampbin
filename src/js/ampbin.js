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

/**
 * Database class
 *
 * Simple wrapper for some Firebase database methods.
 */
class Database {
  /**
   * Database construct to set the 'table'
   * 
   * @param  {String} ref The database 'table' or 'folder'
   */
  constructor(ref) {
    this.db = firebase.database().ref(ref);
  }

  /**
   * Set some values
   *
   * This method will set (overwrite) values in a table.
   * 
   * @param  {Object} obj Object that contains data
   */
  set(obj) {
    this.db.set(obj);
  }

  /**
   * Push some values
   *
   * This method will append values to the table.
   * 
   * @param  {Object} obj Object that contains data
   */
  push(obj) {
    this.db.push(obj);
  }
}

/**
 * Ampbin class
 *
 * Main class to handle everything.
 */
class Ampbin {
  /**
   * Ampbin construct
   * 
   * @param  {Database} database Dependency Injection of Database class
   */
  constructor(database) {
    this.database = database;
  }

  /**
   * Save the current bin
   */
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

  /**
   * Listen for a click on the save button
   * 
   * @param {String} saveId ID of the Save button
   */
  addSaveHandler(saveId = 'save') {
    let saveEl = this.getById(saveId);
    saveEl.onclick = () => this.save();
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

let db = new Database('bins');
let ampbin = new Ampbin(db);
ampbin.addSaveHandler();
