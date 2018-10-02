// index.ts
import firebaseImport = require('firebase/app');
import { loadComponents } from './Components/App';
import { Ampbin } from './Classes/Ampbin';
import { createEditor } from './Classes/Editor';
import { Database } from './Classes/Database';

declare var firebase: firebaseImport.app.App;

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

  // Set the properties for editor/database in Ampbin
  ab.setEditor(editor);
  ab.setDatabase(db);

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
