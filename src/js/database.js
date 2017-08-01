/**
 * Database class
 *
 * Simple wrapper for some Firebase database methods.
 */
export class Database {
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
    return this.db.push(obj);
  }

  /**
   * Get data from a database and don't listen
   * @param  {String} ref Location of the database to retrieve
   */
  retrieveOnce(ref) {
    return firebase.database().ref(ref).once('value');
  }

  /**
   * Get a database reference
   * @param  {String} ref
   */
  getRef(ref) {
    return firebase.database().ref(ref);
  }
}
