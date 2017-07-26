import { Database } from './database';
import { Ampbin } from './ampbin';

let db = new Database('bins');
let ampbin = new Ampbin(db);
ampbin.addSaveHandler();
