import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Init firebase
export function firebaseinit() {
    var config = {
      apiKey: "AIzaSyDcPfiVfjkRp8x9TKqvMup0XTYvAYvPGA8",
      authDomain: "ampbin-fe479.firebaseapp.com",
      databaseURL: "https://ampbin-fe479.firebaseio.com",
      projectId: "ampbin-fe479",
      storageBucket: "ampbin-fe479.appspot.com",
      messagingSenderId: "990487380206"
    };
    firebase.initializeApp(config);

    return firebase;
}
