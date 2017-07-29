import { Database } from './database';
import { Notifications } from './notifications';
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
let notifications = new Notifications('status');
let ampbin = new Ampbin(db, notifications, options);
ampbin.addSaveHandler();
