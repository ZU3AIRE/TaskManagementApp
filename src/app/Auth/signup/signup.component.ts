import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private http: HttpClient, private router: Router) {}

  signup(name: string, email: string, password: string) {
    this.http.post<boolean>('http://localhost:5122/api/User/Signup', {
      name,
      email,
      password,
    })
      .subscribe(
        res => {
          this.router.navigate([ 'Login' ]);
      }
    );
  }
}
