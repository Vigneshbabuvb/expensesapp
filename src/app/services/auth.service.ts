import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        if(userData) {
          resolve(userData);
        }
      })
      .catch((err) => reject(err));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        if(userData) {
          resolve(userData);
        }
      })
      .catch((err) => reject(err));
    });
  }

  getAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.afsAuth.signOut();
  }
}
