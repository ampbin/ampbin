import { AuthInterface, AuthProviders } from '../Interfaces';

export class Auth implements AuthInterface {
  
  private auth: firebase.auth.Auth;
  private authProviders: AuthProviders;
  private currentUser: firebase.User;
  
  constructor(auth: firebase.auth.Auth, authProviders: AuthProviders) {
    this.auth = auth;
    this.authProviders = authProviders;
  }
  
  async loginWithGoogle(): Promise<boolean> {
    return this.auth.signInWithPopup(this.authProviders.google).then((result) => {
      this.currentUser = result.user;
      return true;
    }).catch((error) => {
      console.error(error);
      return false;
    });
  }
  
  loginAnonymously(): void {
    this.auth.signInAnonymously().then((result) => {
      this.currentUser = result.user;
      console.log(result.user);
    }).catch((error) => {
      console.error(error);
    });
  }
  
  logout(): void {
    this.auth.signOut();
  }
  
  getCurrentUser(): firebase.User {
    return this.currentUser;
  }
  
  getAuth(): firebase.auth.Auth {
    return this.auth;
  }
  
}
