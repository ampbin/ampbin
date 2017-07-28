import { Database } from './database';
import { Ampbin } from './ampbin';

let db = new Database('bins');
let options = {
  files: [{
    type: 'html'
  }],
  pane: 'html',
  plugins: [
    'ace',
    'ampbin'
  ]
};
let ampbin = new Ampbin(db, options);
ampbin.addSaveHandler();
