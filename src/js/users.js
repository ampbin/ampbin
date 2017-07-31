export class Users {
  constructor(ampbin) {
    this.ampbin = ampbin;
    this.listen();
  }

  register(email, password) {
    // register the user
    let response = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    //console.log(response);
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  logout() {
    let self = this;
    firebase.auth().signOut().then(function() {
      //location.reload();
      self.toggle('logged-in', 'none');
      self.toggle('not-logged-in', 'block');
    }).catch(function(error) {
      // An error happened.
    });
  }

  listen() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //console.log(user);
        self.toggle('not-logged-in', 'none');
        self.toggle('logged-in', 'block');
        self.ampbin.loggedIn = true;
      }
    });
  }

  toggle(className, display) {
    let divs = document.getElementsByClassName(className);
    for(let i=0; i<divs.length; i++) {
      divs[i].style.display = display;
    }
  }
}
