import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user
} from "@angular/fire/auth";
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  signUp(firstName: string, lastName:string,email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth,email, password))
        .pipe(
            switchMap(({user})=>updateProfile(user, {displayName: lastName + ' ' + firstName}))
        );
  }

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout(){
    return from(this.auth.signOut())
  }

}
