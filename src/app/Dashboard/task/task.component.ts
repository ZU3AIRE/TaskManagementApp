import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  tasks: any;
  beingEdit: any;
  taskStatus:any;
  selectedStatusId: any;
  status: any;
  developers:any;

   // For capturing values from input controls
   @ViewChild('editedTitle') titleEl!: ElementRef;
   @ViewChild('editedDescription') descriptionEl!: ElementRef;
   @ViewChild('status') statusEl!: ElementRef;

  constructor(private http: HttpClient) {
    this.getAll();
    this.TaskStatuses();
    this.GetAllDeveloper();
  }

  //Method for set Identity

  SetEditEntity(task: any) {
    this.beingEdit = task;

    // Set the initial values in the edit modal
    this.titleEl.nativeElement.value = task.title;
    this.descriptionEl.nativeElement.value = task.description;
    this.selectedStatusId=task.status.taskStatusID;
    
    //this.statusEl.nativeElement.value=task.taskStatus


  }

    //Method to get All Status
  TaskStatuses() {
    this.http
      .get('https://localhost:7120/api/TaskStatus/GetAll')
      .subscribe((res) => {
        this.taskStatus = res;
        console.log(this.taskStatus);
      });
  }

  //Method to get All Task
  getAll() {
    this.http
      .get('https://localhost:7120/api/Task/GetAll')
      .subscribe((res) => {
        this.tasks = res;
        console.log(res);
      });
  }

  //Method to Add Task

  AddTask(Title: any, Description: any) {
    this.http
      .post<any>('https://localhost:7120/api/Task/AddTask', {
        title: Title.value,
        description: Description.value,
      })
      .subscribe((res) => {
        location.reload();
      });
  }

  //Method to Update Task

  UpdateTask(){
    if(this.beingEdit){

      this.http.post<any>('https://localhost:7120/api/Task/UpdateTask/'+this.beingEdit.taskId, {
        title:this.titleEl.nativeElement.value,
        description:this.descriptionEl.nativeElement.value,
        status:this.statusEl.nativeElement.selectedOptions[0].innerText
      }).subscribe((res)=>{
        if(res){
          alert("Task is Update Successfully");
          
        }
        else{
          alert('An unknown error occurred while updating the task.');
        }
        location.reload();
      });
    }
    
}

//Method to Delete Task
  DeleteTask(taskId:number){
    this.http.delete<Boolean>('https://localhost:7120/api/Task/Delete/'+taskId,{}).subscribe(res=>{
      if(res){
        alert("Task is delete Successfully")
        location.reload();
      }
      else{
        alert("Task does not exist")
      }
    })
  }

  //Method to get All Developer
  GetAllDeveloper(){
    this.http
      .get('https://localhost:7120/api/Developer/GetAll')
      .subscribe((res) => {
        this.developers = res;
        console.log(this.taskStatus);
      });
  }
  //Method for Assign developer to Task
  AssignTo(){

  }
}
