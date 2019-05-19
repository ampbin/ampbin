// Ampbin.ts
import { EditorInterface, DatabaseInterface, AuthInterface } from '../Interfaces';
import * as toastr from "toastr";

export class Ampbin {

  private editor: EditorInterface;
  private database: DatabaseInterface;
  private auth: AuthInterface;

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
  
  setAuth(auth: AuthInterface) {
    this.auth = auth;
  }

  /**
   * Start the application.
   *
   * Initiate any listeners, setTimeouts, or anything else to get it going.
   */
  start() {
    this.editor.start(300);
    // this.auth.getAuth().onAuthStateChanged((user: firebase.User) => {
    //   if(user) {
    //     console.log(user);
    //   } else {
    //     // this.auth.loginAnonymously();
    //   }
    // });
    if(window.location.hash.length > 0) {
      let doc = this.database.retrieve('bins', window.location.hash.replace("#", ""));
      doc.then((e) => {
        this.getEditor().getCodemirror().setValue(e.get('amphtml'));
      });
      
    }
  }

  /**
   * Overwrite what is in the editor with the default template.
   */
  reset() {
    this.editor.reset();
    toastr.info('Reset!');
  }

  /**
   * Save the AMP HTML to the Firestore database
   */
  save() {
    const document = {
      user: this.getAuth().getCurrentUser() ? this.getAuth().getCurrentUser().uid : '',
      amphtml: this.editor.getValue(),
      saved: Date.now()
    };
    const docref = this.database.create('bins', document);
    docref.then((e) => {
      window.location.hash = '#' + e;
      toastr.success(e, 'Saved!');
    });
  }
  
  getAuth() {
    return this.auth;
  }
  
  getFirebaseAuth() {
    return this.auth.getAuth();
  }
  
  getEditor() {
      return this.editor;
  }

  copyStaticUrl() {
    const url = 'https://static.ampb.in/' + window.location.hash.replace('#', '') + '.html';
    this.copyToClipboard(url);
    toastr.info(url, 'Copied!');
  }

  copyToClipboard(input: string) {
    var dummy = document.createElement('input');
    dummy.value = input;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

}
