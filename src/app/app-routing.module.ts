import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TaskComponent } from './Dashboard/task/task.component';
import { DeveloperComponent } from './Dashboard/developer/developer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Signup',
    component: SignupComponent
  },
  {
    path: '',
    component: TaskComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
