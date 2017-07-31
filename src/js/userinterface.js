export class UserInterface {
	constructor(users) {
    this.users = users;

    this.asideSetup();
    this.loginSetup();
    this.registerViewSetup();
    this.registerSetup();
    this.logout();
    this.login();
  }

  login() {
    let login = this.g('login__button');
    
    login.onclick = () => {
      let email = this.g('login__email');
      let password = this.g('login__password');
      this.users.login(email.value, password.value);
    };
  }

  logout() {
    let logoutButton = this.g('aside--logout');
    logoutButton.onclick = () => {
      this.users.logout();
    };
  }

  registerSetup() {
    let registerButton = this.g('register__button');

    registerButton.onclick = () => {
      let emailEl = this.g('register__email');
      let pwEl = this.g('register__password');
      let pwConfirmEl = this.g('register__password_confirm');

      if(pwEl.value === pwConfirmEl.value) {
        this.users.register(emailEl.value, pwEl.value);
      }
    };
  }

  registerViewSetup() {
    let self = this;
    this.registerContainer = 0;

    let loginEl = document.getElementById('aside--register-nav');
    loginEl.onclick = () => {
      self.registerViewToggle();
    };
  }

  registerViewToggle() {
    let loginForm = document.getElementById('register--container');
    if(this.registerContainer === 1) {
      loginForm.className = "hidden";
      this.registerContainer = 0;
    } else {
      loginForm.className = "register--container";
      this.registerContainer = 1;
    }
  }

  loginSetup() {
    let self = this;
    this.loginContainer = 0;

    let loginEl = document.getElementById('aside--login-nav');
    loginEl.onclick = () => {
      self.loginToggle();
    };
  }

  loginToggle() {
    let loginForm = document.getElementById('login--container');
    if(this.loginContainer === 1) {
      loginForm.className = "hidden";
      this.loginContainer = 0;
    } else {
      loginForm.className = "login--container";
      this.loginContainer = 1;
    }
  }

  asideSetup() {
    let self = this;
    this.aside = 0;

    let asideEl = document.getElementById('aside--close');    
    asideEl.onclick = () => {
      self.asideToggle();
    };

    let headerEl = document.getElementById('aside--open');
    headerEl.onclick = () => {
      self.asideToggle();
    };
  }

  asideToggle() {
    let aside = document.getElementById('aside');
    if(this.aside === 1) {
      aside.className = "hidden-aside";
      this.aside = 0;
    } else {
      aside.className = "";
      this.aside = 1;
    }
  }

  g(elId) {
    return document.getElementById(elId);
  }
}
