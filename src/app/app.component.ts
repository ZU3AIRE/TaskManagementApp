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
  // For Edit
  @ViewChild('title') editTitleEl!: ElementRef;
  @ViewChild('description') editDescriptionEl!: ElementRef;
  

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
  Edit() {
    debugger;
    var title = this.editTitleEl.nativeElement.value;
    var description = this.editDescriptionEl.nativeElement.value;
    this.http
      .post<any>(`${environment.apiEndpoint}/Task/EditTask/${task.taskId}`, {
        title: title,
        description: description,
      })
      .subscribe((res) => {
        if (typeof res == 'boolean' && res == false) {
          alert('task Not Updated');
        } else {
          this.editTitleEl.nativeElement.value = '';
          this.editDescriptionEl.nativeElement.value = '';
          this.getAllTask();
          alert('Task Updated Succesfully');
        }
      });
  }


//  Edit() {
//   const updatedTitle = prompt('Enter the updated title:', task.title);
//   const updatedDescription = prompt('Enter the updated description:', task.description);

//   if (updatedTitle && updatedDescription) {
//     const updatedTask = {
//       title: updatedTitle,
//       description: updatedDescription,
//     };

//     this.http.post<any>(`${environment.apiEndpoint}/Task/EditTask/${task.taskId}`, updatedTask)
//       .subscribe(
//         () => {
//           task.title = updatedTitle;
//           task.description = updatedDescription;
//           alert('Task updated successfully.');
//         },
//         (error) => {
//           console.error('Error updating task:', error);
//           alert('Error updating task. Please try again.');
//         }
//       );
//   }
// }


  getAllTask() {
    this.http
      .get<Task[]>(`${environment.apiEndpoint}/Task/GetAll`)
      .subscribe((res) => {
        this.tasks = res;
      });
  }
  Delete(task: any) {
    var confirmDelete = confirm('Are You Want to delete');
    if (confirmDelete) {
      this.http
        .delete<any>(`${environment.apiEndpoint}/Task/Delete/${task.taskId}`)
        .subscribe(
          (res) => {
            if (res) {
              this.getAllTask();
              //this.tasks = this.tasks.filter((x) => x.taskId != task.taskId);
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
  taskId: number;
  title: string;
  description: string;
}
