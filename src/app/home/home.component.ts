import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'TaskManagementApp';

  developers: Developer[] = [];
  taskStatuses: TaskStatus[] = [];
  TaskEdit: any;

  tasks: Task[] = [];
  editingTask: Task | null = null;
  editingDeveloper: Developer | null = null;
  selectedDeveloperId: number | null = null;
  selectedStatusId: number | null = null;

  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;
  @ViewChild('editedTitle') editedTitleEl!: ElementRef;
  @ViewChild('editedDescription') editedDescriptionEl!: ElementRef;
  @ViewChild('status') statusEl!: ElementRef;
  @ViewChild('developer') developerEl!: ElementRef;

  filteredTasks: Task[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {
    this.getAllTask();
    this.getAllDeveloper();
  }

  TaskStatuses() {
    this.http
      .get<TaskStatus[]>(`${environment.apiEndpoint}/TaskStatus/GetAll`)
      .subscribe(
        (res) => {
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
        console.log(this.developers);
      });
  }

  addNewTask() {
    const title = this.titleEl.nativeElement.value;
    const desc = this.descriptionEl.nativeElement.value;

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
          alert('Some Unknown Error Occurred');
        }
      );
  }

  getAllTask() {
    this.TaskStatuses();
    this.getAllDeveloper();
    this.http
      .get<Task[]>(`${environment.apiEndpoint}/Task/GetAll`)
      .subscribe((res) => {
        this.tasks = res;
        this.filterTasks();
      });
  }

  Edit(task: Task) {
    this.editingTask = task;
    this.editedTitleEl.nativeElement.value = task.title;
    this.editedDescriptionEl.nativeElement.value = task.description;
    this.selectedStatusId = task.status.taskStatusID;
  }

  saveDevelopers() {
    if (this.editingDeveloper) {
      this.editingDeveloper.developer = { developerId: this.selectedDeveloperId };
      this.http
        .post<void>(`${environment.apiEndpoint}/Developer/UpdateDeveloper/${this.editingDeveloper.developerId}`, {
          developer: this.developerEl.nativeElement.selectedOptions[0].innerText,
        })
        .subscribe(
          (res) => {
            this.getAllDeveloper();
            alert('Developer updated successfully!');
          },
          (err) => {
            alert('An unknown error occurred while updating the Developer.');
          }
        );
      this.editingDeveloper = null;
    }
  }

  saveEditedTask() {
    if (this.editingTask) {
      const editedTitle = this.editedTitleEl.nativeElement.value;
      const editedDescription = this.editedDescriptionEl.nativeElement.value;
      this.editingTask.title = editedTitle;
      this.editingTask.description = editedDescription;
      this.editingTask.status = { taskStatusID: this.selectedStatusId };
      this.http
        .post<void>(`${environment.apiEndpoint}/Task/EditTask?id=${this.editingTask.taskId}`, {
          title: this.editingTask.title,
          description: this.editingTask.description,
          status: this.statusEl.nativeElement.selectedOptions[0].innerText,
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
      this.editingTask = null;
    }
  }

  Delete(task: Task) {
    const confirmDelete = confirm('Are You Want to delete');
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
  filterTasks() {
    if (!this.searchText) {
      this.filteredTasks = this.tasks;
    } else {
      const searchKeyword = this.searchText.toLowerCase();
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(searchKeyword)
      );
    }
  }
  // filterTasks() {
  //   if (!this.searchText) {
  //     this.filteredTasks = this.tasks;
  //   } else {
  //     const searchLetter = this.searchText.charAt(0).toLowerCase();
  //     this.filteredTasks = this.tasks.filter((task) =>
  //       task.title.toLowerCase().startsWith(searchLetter)
  //     );
  //   }
  // }
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
