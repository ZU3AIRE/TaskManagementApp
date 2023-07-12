import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"uploads", component : FilesComponent 
  },
  {
    path: "Home", component: HomeComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
