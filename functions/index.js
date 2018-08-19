const functions = require('firebase-functions');
const admin = require('firebase-admin');
const storage = require('@google-cloud/storage')();

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

// feel like there is a better way to do this.
// exports.createFile = functions.region('us-east1').firestore.document('/bins/{documentId}')
//     .onCreate((snap, context) => {
//         let amphtml = snap.data().amphtml;
//         let binid = context.params.documentId;
//         let filename = binid + '.html';
// 
//         const bucket = storage.bucket('ampbin-fe479.appspot.com');
//         const file = bucket.file(filename);
//         return file.setMetadata({
//             contentType: 'text/html'
//         }).then(() => {
//             const uploadStream = file.createWriteStream();
//             uploadStream.on('error', (err) => {
//                 res.send(err);
//             }).on('finish', () => {
//                 res.send('ok');
//             });
//             uploadStream.write(amphtml);
//             uploadStream.end();
// 
//             return 'done';
//         })
// });
