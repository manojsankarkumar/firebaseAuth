import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email = '';
  password = '';
  message = '';
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

  registerUser() {
           this.clearErrorMessage();
       if(this.validateForm(this.email, this.password)){
           this.authService.registerWithEmail(this.email, this.password).then(() => {
             this.message = "You have registered successfully";
             this.router.navigate(['/home'])
           }).catch(_error => {
             this.error = _error
             this.router.navigate(['/register'])
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
