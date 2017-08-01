export class Users {
  constructor(ampbin) {
    this.ampbin = ampbin;
    this.listen();
    let response = firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode);
    });
    response.then((data) => {
      //console.log(data);
    });
  }

  register(email, password) {
      let credential = firebase.auth.EmailAuthProvider.credential(email, password);
      let self = this;
      firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
        self.toggle('not-logged-in', 'none');
        self.toggle('logged-in', 'block');
        console.log("Account linking success", user);
      }, function(error) {
        console.log("Account linking error", error);
        self.showError('register-error', error);
      });
  }

  login(email, password) {
    let self = this;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      self.showError('login-error', error.message);
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
        let isAnonymous = user.isAnonymous;

        if(isAnonymous === false) {
          self.toggle('not-logged-in', 'none');
          self.toggle('logged-in', 'block');
        }
        self.ampbin.loggedIn = true;
        self.ampbin.binListener(user.uid);
      }
    });
  }

  showError(elId, error) {
    let erEl = document.getElementById(elId);
    erEl.style.display = 'inline-block';
    erEl.innerHTML = error;
    setTimeout(() => {
      erEl.style.display = 'none';
    }, 3000);
  }

  toggle(className, display) {
    let divs = document.getElementsByClassName(className);
    for(let i=0; i<divs.length; i++) {
      divs[i].style.display = display;
    }
  }
}
