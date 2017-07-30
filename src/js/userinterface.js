export class UserInterface {
	constructor(m) {
    this.m = m;

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
