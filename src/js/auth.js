export function login(firebase) {
    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return user.uid;
    }
    });
}

export function persist(firebase) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
}
