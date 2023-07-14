import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path:"uploads", component : FilesComponent 
  },
  {
    path: "Home", component: HomeComponent,

  },
  // {
  //   path: "", redirectTo:  "Home"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
