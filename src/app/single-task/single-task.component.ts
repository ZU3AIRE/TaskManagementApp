import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent {
  tasks: any;
  constructor(private http:HttpClient){

  }
  
  getDataById(id:any){
    this.http.get('https://localhost:7120/api/Task/Get/'+id).subscribe((res)=>{
      this.tasks=[res];
      console.log(this.tasks)
    })
  }
}
