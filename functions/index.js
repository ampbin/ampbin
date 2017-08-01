'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Keeps track of the length of the 'likes' child list in a separate property.
exports.binCount = functions.database.ref('/bins/{binid}').onWrite(event => {
  // const collectionRef = event.data.ref.parent;
  // const countRef = collectionRef.parent.child('bin_count');

  // // Return the promise from countRef.transaction() so our function 
  // // waits for this async event to complete before it exits.
  // return countRef.transaction(current => {
  //   if (event.data.exists() && !event.data.previous.exists()) {
  //     return (current || 0) + 1;
  //   }
  //   else if (!event.data.exists() && event.data.previous.exists()) {
  //     return (current || 0) - 1;
  //   }
  // }).then(() => {
  //   console.log('Counter updated.');
  // });
});
