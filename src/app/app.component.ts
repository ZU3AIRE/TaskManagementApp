import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TaskManagementApp';

  // Array of tasks from db
  tasks: Task[] = [];

  // For capturing values from input controls
  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;

  constructor(private http: HttpClient) {
    this.getAllTask();
  }

  addNewTask() {
    var title = this.titleEl.nativeElement.value;
    var desc = this.descriptionEl.nativeElement.value;

    this.http
      .post<any>(`${environment.apiEndpoint}/Task/AddTask`, {
        title: title,
        description: desc,
      })
      .subscribe((res) => {
        if (typeof res == 'boolean' && res == false) {
          alert('Task not added!');
        } else {
          this.descriptionEl.nativeElement.value = '';
          this.titleEl.nativeElement.value = '';
          this.getAllTask();
          alert('Task added successfully.');
        }
      });
  }

  getAllTask() {
    this.http
      .get<Task[]>(`${environment.apiEndpoint}/Task/GetAll`)
      .subscribe((res) => {
        this.tasks = res;
      });
  }

  Edit(task: any) {
    alert('You are trying to edit: ' + task.title);
  }

  Delete(task: any) {
    alert('You are trying to delete: ' + task.title);
  }
}

export interface Task {
  taskId: number;
  title: string;
  description: string;
}
