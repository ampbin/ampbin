export function login(firebase) {
    console.log("signing in");
    console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser) {
        console.log("line 4", firebase.auth().currentUser);
        return;
    }
    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(firebase.auth().currentUser);
        if (user) {
          return user.uid;
        }
    });
}
