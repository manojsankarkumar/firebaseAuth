import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message:''};
  }

  login() {
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password)){
        this.authService.loginWithEmail(this.email, this.password).then(() => {
          this.router.navigate(['/home'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/login'])
        })
    }
  }

  validateForm(email, password){
    if(email.length === 0) {
      this.errorMessage = "Enter email id";
      return false;
    }
    if(password.length === 0) {
     this.errorMessage = "Enter password";
     return false;
   }
    if(password.length < 6) {
      this.errorMessage = "Password should be atleast 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;
 }
}
