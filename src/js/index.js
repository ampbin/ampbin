import { Ampbin } from './ampbin';
import { Database } from './database';
import { Notifications } from './notifications';
import { UserInterface } from './userinterface';

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

let db = new Database('bins');
let notifications = new Notifications('status');
let userinterface = new UserInterface();
let ampbin = new Ampbin(db, notifications, options);

ampbin.addSaveHandler();
