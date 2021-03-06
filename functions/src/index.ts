import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import *  as express from 'express';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();

app.get('/:id', (req, res) => {
    let id = req.params.id;
    id = id.replace('.html', '');
    if (!id) {
        res.send('');
        return;
    }
    const bin = db.collection('bins').doc(id);
    bin.get().then(doc => {
        if(!doc.exists) {
            res.send('');
            return;
        }
        if(doc.exists) {
            const data = doc.data();
            if(data) {
                res.send(data.amphtml);
                return;
            }
        }
    }).catch(err => {
        res.send('Error getting document.');
        return;
    })
    ;
  });

exports.app = functions.https.onRequest(app);
