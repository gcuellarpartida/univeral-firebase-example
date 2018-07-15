import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  isLoading = false;

  constructor(private authService: AuthService,
    private sb: MatSnackBar) {
  }

  onSignUp(form: NgForm) {
    this.isLoading = true;
    this.authService.registerUser(form.value.email, form.value.password).then(result => {
      this.isLoading = false;
      this.showMessage('Signup successful!');
    }).catch(error => {
      this.isLoading = false;
      this.showMessage(error.message);
    });
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password).then(result => {
      this.isLoading = false;
      this.showMessage('Login successful');
      form.resetForm();
    }).catch(error => {
       this.isLoading = false;
       this.showMessage(error.message);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  showMessage(message: string) {
    this.sb.open(message, null, {
      duration: 3000
    });
  }
}
