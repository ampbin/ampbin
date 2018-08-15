import {updateHash, updateSaveStatus} from './helpers';

export function connect(firebase) {
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    return firebase.firestore();
}

export function save(db, userid, editor) {
    db.collection("bins").add({
        user: userid,
        amphtml: editor.getValue(),
        saved: new Date().getTime()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        updateHash(docRef.id);
        updateSaveStatus();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export function getBin(db, bin, editor) {
    bin = bin.replace("#", "");
    console.log("Getting bin " + bin);
    var docRef = db.collection("bins").doc(bin);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            editor.setValue(doc.data().amphtml);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
