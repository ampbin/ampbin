declare var firebase: typeof import('firebase');
import { loadComponents } from './Components/App';
import { Ampbin } from './Classes/Ampbin';
import { createEditor } from './Classes/Editor';
import { Database } from './Classes/Database';
import { Auth } from './Classes/Auth';

const authProviders = {
  google: new firebase.auth.GoogleAuthProvider()
};

/*
@TODO: setState removes the editor since it wasn't created by preact.
       maybe i could put it in an iframe like the preview does?
 */

const ab = new Ampbin();

// Preact App Component componentDidMount calls bootstrap
function bootstrap() {
  // Call factory function to create our Editor
  const editor = createEditor('editor', 'preview', {
      mode: 'text/html',
      lineNumbers: true,
      lineWrapping: true
  });
  // Instantiate our Database class and pass firestore to it
  const db = new Database(firebase.firestore());
  
  const auth = new Auth(firebase.auth(), authProviders);

  // Set the properties for editor/database in Ampbin
  ab.setEditor(editor);
  ab.setDatabase(db);
  ab.setAuth(auth);

  // Start whatever else is needed
  ab.start();
}

// Load the preact component
loadComponents(
  ab,        // Ampbin object
  'App',     // ID of container div
  'editor',  // ID of textarea
  'preview', // ID of preview area
  bootstrap  // Callback after components mount
);
