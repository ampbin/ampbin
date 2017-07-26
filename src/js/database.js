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
    this.db.push(obj);
  }
}
