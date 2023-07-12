import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { TaskComponent } from './Dashboard/task/task.component';
import { DeveloperComponent } from './Dashboard/developer/developer.component';
import { HomeComponent } from './home/home.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';

const routes: Routes = [
 
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'task' ,
    component: TaskComponent
  },
  {
    path:'single',
    component:SingleTaskComponent
  },
  {
    path:'upload',
    component:ImageuploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
