export class Notifications {
	constructor(statusId) {
    this.status = document.getElementById(statusId);
  }

  show(message) {
    this.status.innerHTML = '';
    let notification = document.createTextNode(message);
    this.status.appendChild(notification);
    this.status.className += ' show-status';

    setTimeout(() => {
      this.status.className = 'status';
    }, 2400);
  }
}
