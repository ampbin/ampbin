export class UserInterface {
	constructor() {
    this.asideSetup();
    this.loginSetup();
    this.registerSetup();
  }

  registerSetup() {
    let self = this;
    this.registerContainer = 0;

    let loginEl = document.getElementById('aside--register-nav');
    loginEl.onclick = () => {
      self.registerToggle();
    };
  }

  registerToggle() {
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
}
