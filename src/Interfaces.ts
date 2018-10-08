// Interfaces.ts
import firebaseImport = require('firebase/app');

export interface DocumentInterface {
  user: string;
  amphtml: string;
  saved: number;
}

export interface DatabaseInterface {
  create(collection: string, data: DocumentInterface): Promise<string>;
  retrieve(collection: string, doc: string): Promise<firebaseImport.firestore.DocumentSnapshot>;
  update(collection: string, doc: string, data: DocumentInterface): void;
  delete(collection: string, doc: string): void;
}

export interface EditorInterface {
  start(interval: number): void;
  reset(): void;
  getValue(): string;
}

export interface AuthInterface {
  loginWithGoogle(): Promise<boolean>;
  loginAnonymously(): void;
  logout(): Promise<void>;
  getCurrentUser(): firebase.User;
  getAuth(): firebase.auth.Auth;
}

export interface AuthProviders {
  google?: firebase.auth.AuthProvider;
  github?: firebase.auth.AuthProvider;
  facebook?: firebase.auth.AuthProvider;
  twitter?: firebase.auth.AuthProvider;
}
