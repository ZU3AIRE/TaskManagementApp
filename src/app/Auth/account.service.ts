import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url='https://localhost:7120/api/Account/'
  constructor(private http:HttpClient) { }

  loginUser(user:Array<string>){
    return this.http.post<Boolean>(this.url+"login",{
      email:user[0],
      password:user[1]
    })
  }

  signUpUser(user:Array<string>){
    return this.http.post<Boolean>("https://localhost:7120/api/Account/Signup",{
    name:user[0],
      email:user[1],
      password:user[2]
    })
  }
}
