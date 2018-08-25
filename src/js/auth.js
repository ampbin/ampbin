// This really isn't doing anything
export function login(firebase) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            // User isn't signed in, sign them in anonymously
            firebase.auth().signInAnonymously().catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
        return user.uid;
    });
}
