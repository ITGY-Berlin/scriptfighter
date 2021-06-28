import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  signIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new (firebase as any).auth.GoogleAuthProvider();
      this.angularFireAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  }

  signInWithGithub() {
    return new Promise<any>((resolve, reject) => {
      const provider = new (firebase as any).auth.GithubAuthProvider();
      this.angularFireAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  }

  SignOut() {
    return this.angularFireAuth.signOut();
  }
}
