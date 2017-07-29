const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.keepCount = functions.database.ref('/bins/{binid}')
  .onWrite((event) => {
    let counterRef = functions.database.ref('count');
    console.log(counterRef);
  }
);
