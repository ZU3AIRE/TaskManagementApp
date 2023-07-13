import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [ {
  path:'upload',
  component:UploadComponent,

},
{
  path:'task',
  component:TaskComponent,

}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
