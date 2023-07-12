import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  signupform:FormGroup
  constructor(private account:AccountService, private router: Router, private toastr:ToastrService) {
    this.signupform=new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  //Single input Validation
  get name() {
    return this.signupform.get('name');
  }
  get email() {
    return this.signupform.get('email');
  }
  get password() {
    return this.signupform.get('password');
  }

//Show Toaster
  showsuccess(){
    this.toastr.success('Successfully login', 'Congratulation')
  }

  showerror(){
    this.toastr.error('User Already Exist','Warning' )
  }

  //Method to sibmit form
  signup() {
    this.account.signUpUser([this.signupform.value.name, this.signupform.value.email, this.signupform.value.password])
      .subscribe(
        res => {
          if(res){
            this.showsuccess();
            this.router.navigate([ 'login' ]);
          }
          else{
            this.showerror();
          }
          
      }
    );
  }
}
