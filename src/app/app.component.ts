import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TaskManagementApp';

  // Array of tasks from db
  tasks: any[] = [];

  // For capturing values from input controls
  @ViewChild('title') titleEl!: ElementRef;
  @ViewChild('description') descriptionEl!: ElementRef;

  constructor() {
    this.getAllTask();
  }

  addNewTask() {
    var title = this.titleEl.nativeElement.value;
    var desc = this.descriptionEl.nativeElement.value;

    alert(
      'You are trying to add a new task having\n\nTitle: ' +
        title +
        '\nDescription: ' +
        desc
    );
  }

  getAllTask() {
    // Write Code here for fetching the data from API
    this.tasks.push({
      title: 'Implement JWT',
      description:
        'Use Dotnet API for Token Generation and utilize the api from angular for authentication.',
    });
    this.tasks.push({
      title: 'Integrate Database using Code First',
      description: 'Use Entity Framework Core',
    });
  }

  Edit(task: any) {
    alert('You are trying to edit: ' + task.title);
  }

  Delete(task: any) {
    alert('You are trying to delete: ' + task.title);
  }
}
