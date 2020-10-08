import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) { 
    this.angularFireAuth.authState.subscribe((auth => {
      this.authState = auth;
    }))
  }

  // all firebase getdata functions
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get CurrentUserId(): string {
    return (this.authState !== null) ? this.authState.uid: ''
  }

  get CurrentUserName(): string {
    return this.authState['email']
  }

  get CurrentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get IsUserEmailLoggedIn(): boolean {
    if((this.authState !== null) && (!this.isUserAnonymousLoggedIn)){
      return true
    } else {
      return false
    }
  }

  async registerWithEmail(email:string, password:string){
    this.angularFireAuth.createUserWithEmailAndPassword(email,password).then((user) =>
    {
        this.authState = user
    }).catch(error => {
         console.log(error)
         throw error
    });
  }

  loginWithEmail(email:string, password:string){
    this.angularFireAuth.signInWithEmailAndPassword(email,password).then((user) =>
    {
        this.authState = user
    }).catch(error => {
         console.log(error)
         throw error
    });
  }

  signOut(): void {
    this.angularFireAuth.signOut();
    this.router.navigate(['/login']);
  }

}
