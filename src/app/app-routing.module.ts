import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TaskComponent } from './Dashboard/task/task.component';
import { DeveloperComponent } from './Dashboard/developer/developer.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Signup',
    component: SignupComponent
  },
  {
    path: 'Tasks',
    component: TaskComponent
  },
  {
    path: 'Developers',
    component: DeveloperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
