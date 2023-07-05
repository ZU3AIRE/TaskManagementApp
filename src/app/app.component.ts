import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TaskManagementApp';

  // Add an array to store task statuses
  taskStatuses: TaskStatus[] = [];
  TaskEdit: any;
  // Array of tasks from db
  tasks: Task[] = [];
  editingTask: Task | null = null;

  selectedStatusId: number | null = null;



  // For capturing values from input controls
  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;
  @ViewChild('editedTitle') editedTitleEl!: ElementRef;
  @ViewChild('editedDescription') editedDescriptionEl!: ElementRef;
  @ViewChild('status') statusEl!: ElementRef;


  constructor(private http: HttpClient) {
    this.getAllTask();


  }
  TaskStatuses() {
    this.http
      .get<TaskStatus[]>(`${environment.apiEndpoint}/TaskStatus/GetAll`)
      .subscribe((res) => {
        this.taskStatuses = res;
        console.log(this.taskStatuses);
      },
        (err) => {
          console.error('Failed to fetch task statuses:', err);
        }
      );
  }

  addNewTask() {
    var title = this.titleEl.nativeElement.value;
    var desc = this.descriptionEl.nativeElement.value;

    this.http
      .post<void>(`${environment.apiEndpoint}/Task/AddTask`, {
        title: title,
        description: desc,

      })
      .subscribe(
        (res) => {
          this.titleEl.nativeElement.value = '';
          this.descriptionEl.nativeElement.value = '';
          this.getAllTask();
          alert('Added Successfully!');
        },
        (err) => {
          alert('Some Unknow Error Occured');
        }
      );
  }

  getAllTask() {
    this.TaskStatuses(); // Call TaskStatuses() to fetch the task statuses
    this.http
      .get<Task[]>(`${environment.apiEndpoint}/Task/GetAll`)
      .subscribe((res) => {
        this.tasks = res;
      });
  }

  Edit(task: Task) {
    // Set the task being edited
    this.editingTask = task;

    // Set the initial values in the edit modal
    this.editedTitleEl.nativeElement.value = task.title;
    this.editedDescriptionEl.nativeElement.value = task.description;
    //var status = this.statusEl.nativeElement.value;
    this.selectedStatusId = task.status.taskStatusID; // Set the initial selected status

  }

  saveEditedTask() {
    if (this.editingTask) {
      // Get the edited values from the input controls
      var editedTitle = this.editedTitleEl.nativeElement.value;
      var editedDescription = this.editedDescriptionEl.nativeElement.value;

      // Update the task with the edited values
      this.editingTask.title = editedTitle;
      this.editingTask.description = editedDescription;
      this.editingTask.status = { taskStatusID: this.selectedStatusId }; // Update the status object
      //debugger

      // Send the updated task to the API
      this.http
        .post<void>(`${environment.apiEndpoint}/Task/EditTask?id=${this.editingTask.taskId}`, {
          title: this.editingTask.title,
          description: this.editingTask.description,
          status: this.statusEl.nativeElement.selectedOptions[0].innerText
        })
        .subscribe(
          (res) => {
            this.getAllTask();
            alert('Task updated successfully!');
          },
          (err) => {
            alert('An unknown error occurred while updating the task.');
          }
        );

      // Reset the editingTask variable
      this.editingTask = null;
    }
  }



  Delete(task: Task) {
    var confirmDelete = confirm('Are You Want to delete');
    this.http
      .delete<void>(`${environment.apiEndpoint}/Task/Delete/${task.taskId}`)
      .subscribe(
        () => {
          this.getAllTask();
          alert('Task deleted successfully!');
        },
        (err) => {
          alert('An unknown error occurred while deleting the task.');
        }
      );
  }
}



export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: any;

}
export interface TaskStatus {
  taskStatusID: number;
  status: string;
}
