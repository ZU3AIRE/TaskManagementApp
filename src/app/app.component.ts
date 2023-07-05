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
  taskStatuses: any[] = [];
  tasks: any[] = [];
  TaskEdit: any;
  selectedStatusId: any;
  // For capturing values from input controls
  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;
  // For Edit
  @ViewChild('editTitle') editTitleEl!: ElementRef;
  @ViewChild('status') statusEl!: ElementRef;
  @ViewChild('editDescription') editDescriptionEl!: ElementRef;

  constructor(private http: HttpClient) {
    this.getAllTask();
    this.TaskStatuses();
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
  Edit() {
    var title = this.editTitleEl.nativeElement.value;
    var description = this.editDescriptionEl.nativeElement.value;
    var statusId = this.selectedStatusId;
    debugger;
    this.http
      .post<any>(`${environment.apiEndpoint}/Task/EditTask/${this.TaskEdit}`, {
        title: title,
        description: description,
        status: this.taskStatuses.filter(
          (x) => x.taskStatusID == this.selectedStatusId
        )[0].status,
      })
      .subscribe(
        (res) => {
          if (res) {
            this.editTitleEl.nativeElement.value = '';
            this.editDescriptionEl.nativeElement.value = '';
            this.getAllTask();
            alert('Task Updated Successfully');
          } else {
            alert('Error: Task Not Updated');
          }
        },
        (error) => {
          alert('Error: ' + error.message);
        }
      );
  }
  EditModal(task: Task) {
    this.TaskEdit = task.taskId;
    this.editTitleEl.nativeElement.value = task.title;
    this.editDescriptionEl.nativeElement.value = task.description;
    this.selectedStatusId = task.status.taskStatusID;
  }
  getStatusValue(statusId: any): any {
    var getStatusValueEndpoint = `${environment.apiEndpoint}/TaskStatuses/${statusId}`;
    return this.http.get<any>(getStatusValueEndpoint);
  }
  getAllTask() {
    this.http
      .get<any[]>(`${environment.apiEndpoint}/Task/GetAll`)
      .subscribe((res) => {
        this.tasks = res;
      });
  }
  TaskStatuses() {
    this.http
      .get<any[]>(`${environment.apiEndpoint}/TaskStatus/GetAll`)
      .subscribe((res) => {
        this.taskStatuses = res;
        console.log(this.taskStatuses);
      });
  }

  Delete(task: any) {
    var confirmDelete = confirm('Are You Sure You Want to Delete!!');
    if (confirmDelete) {
      this.http
        .delete<any>(`${environment.apiEndpoint}/Task/Delete/${task.taskId}`)
        .subscribe(
          (res) => {
            if (res) {
              this.getAllTask();
              alert('Task Deleted Succesfully');
            } else {
              alert('Error While Deleteing the Task');
            }
          },
          (err) => {
            console.error('error Deleting the task', err);
          }
        );
    }
  }
}
export interface Task {
  status: any;
  taskId: number;
  title: string;
  description: string;
}
export interface TaskStatus {
  taskStatusID: number;
  status: string;
}
