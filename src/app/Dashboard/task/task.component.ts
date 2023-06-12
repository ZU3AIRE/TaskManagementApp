import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface TaskModel {
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
  tasks: TaskModel[] = [];
  beingEdit: number = 0;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  SetEditEntity(taskId: number) {
    this.beingEdit = taskId;
  }

  getAll() {
    this.http
      .get<TaskModel[]>('https://localhost:44352/api/Task/GetAll')
      .subscribe((res) => {
        this.tasks = res;
      });
  }

  AddTask(Title: any, Description: any) {
    debugger;
    this.http
      .post<any>('https://localhost:44352/api/Task/Add', {
        title: Title.value,
        description: Description.value,
      })
      .subscribe((res) => {
        location.reload();
      });
  }
}
