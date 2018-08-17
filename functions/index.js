const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({
    timestampsInSnapshots: true
});

exports.binCounter = functions.region('us-east1').firestore.document('/bins/{documentId}')
    .onCreate((snap, context) => {
        let total;
        
        let ref = firestore.collection('counter').doc('bin_count');
        return ref.get().then((doc) => {
            return doc.data().total + 1;
        }).then((total) => {
            return ref.set({
                total: total
            });
        })
        .catch((err) => {
            console.log(err);
        });
    });
