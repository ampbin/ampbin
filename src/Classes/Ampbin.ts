// Ampbin.ts
import { EditorInterface, DatabaseInterface } from '../Interfaces';

export class Ampbin {

  private editor: EditorInterface;
  private database: DatabaseInterface;

  /**
   * Set the editor property on the class
   * @param  editor Instantiated Editor class that implements EditorInterface
   */
  setEditor(editor: EditorInterface) {
    this.editor = editor;
  }

  /**
   * Set the database property on the class
   * @param  database Instantiated Database class that implements DatabaseInterface
   */
  setDatabase(database: DatabaseInterface) {
    this.database = database;
  }

  /**
   * Start the application.
   *
   * Initiate any listeners, setTimeouts, or anything else to get it going.
   */
  start() {
    this.editor.start(300);
  }

  /**
   * Overwrite what is in the editor with the default template.
   */
  reset() {
    this.editor.reset();
  }

  /**
   * Save the AMP HTML to the Firestore database
   */
  save() {
    const document = {
      user: '', // @TODO get actual user id
      amphtml: this.editor.getValue(),
      saved: 3 // @TODO get saved datetime
    };
    const docref = this.database.create('bins', document);
    console.log(docref);
  }

}
