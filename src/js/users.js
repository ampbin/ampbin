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
  }

  login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  logout() {
    let self = this;
    firebase.auth().signOut().then(function() {
      self.toggle('logged-in', 'none');
      self.toggle('not-logged-in', 'block');
      let bins = document.getElementById('recent-bins-list');
      bins.innerHTML = '';
    }).catch(function(error) {
      console.error(error);
    });
  }

  listen() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.toggle('not-logged-in', 'none');
        self.toggle('logged-in', 'block');
        self.ampbin.loggedIn = true;
        self.ampbin.binListener(user.uid);
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
