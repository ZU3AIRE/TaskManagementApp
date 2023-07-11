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
  developer: Developer[] = [];
  developers: Developer[] = [];
  taskStatuses: TaskStatus[] = [];
  TaskEdit: any;
  selectedFile: File | null = null;
  // Array of tasks from db
  tasks: Task[] = [];
  editingTask: Task | null = null;
  editingDeveloper: Developer | null = null;
  selectedDeveloperId: number | null = null;
  selectedStatusId: number | null = null;



  // For capturing values from input controls
  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;
  @ViewChild('editedTitle') editedTitleEl!: ElementRef;
  @ViewChild('editedDescription') editedDescriptionEl!: ElementRef;
  @ViewChild('status') statusEl!: ElementRef;
  @ViewChild('developer') developerEl!: ElementRef;


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

  getAllDeveloper() {

    this.http
      .get<Developer[]>(`${environment.apiEndpoint}/Developer/GetAll`)
      .subscribe((res) => {
        this.developers = res;
        console.log(this.developers)
      });
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
    this.getAllDeveloper();
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
    //this.statusEl.nativeElement.value = task.status;
    this.selectedStatusId = task.status.taskStatusID; // Set the initial selected status
    //this.selectedDeveloperId = task.developer.developerId;

  }
  saveDevelopers() {
    debugger;

    if (this.editingDeveloper) {

      
     this.editingDeveloper.developer = { developerId: this.selectedDeveloperId };



      this.http
        .post<void>(`${environment.apiEndpoint}/Developer/UpdateDeveloper/${this.editingDeveloper.developerId}`, {
          developer: this.developerEl.nativeElement.selectedOptions[0].innerText

        }).subscribe(
          (res) => {
            this.getAllDeveloper();
            alert('Developer updated successfully!');
          },
          (err) => {
            alert('An unknown error occurred while updating the Developer.');
          }
        )
        this.editingDeveloper = null;

    }

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
  onFileSelected(event: any) {
    // Get the selected file from the event
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Send the file to the backend API endpoint for upload
      this.http
        .post<any>(`${environment.apiEndpoint}/File/UploadFile/upload`,formData).subscribe(
          (response) => {
            console.log(response);
            alert("File uploaded successfully")
          },
         
        );
        }
      }
}



export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: any;
  developer: any;

}
export interface TaskStatus {
  taskStatusID: number;
  status: string;
}
export interface Developer {
  developerId: number;
  name: string;
  developer: any;

}   