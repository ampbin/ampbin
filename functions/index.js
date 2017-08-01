'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.binCount = functions.database.ref('/bins/{binid}').onWrite(event => {
  const countRef = admin.database().ref('bin_count');

  return countRef.transaction(current => {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  }).then(() => {
    console.log('Counter updated.');
  });
});
