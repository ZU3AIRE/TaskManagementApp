import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginform: FormGroup;

  constructor(
    private account: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.loginform.get('email');
  }
  get password() {
    return this.loginform.get('password');
  }

  showsuccess() {
    this.toastr.success('Successfully login', 'Congratulation');
  }

  showerror() {
    this.toastr.error('Email or Password is Incorrect', 'Warning');
  }

  loginFormSave() {
    this.account
      .loginUser([this.loginform.value.email, this.loginform.value.password])
      .subscribe((res) => {
        if (res) {
          this.showsuccess();
          this.router.navigate(['']);
          //alert('Login Successfully');
        } else {
          this.showerror();
          //alert('Username of password is incorrect');
        }
      });
  }
}
