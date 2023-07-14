import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent {

  selectedFile: File | null = null;
  files: Filee[] = [];

  @ViewChild('urlInput') urlInputEl!: ElementRef;

  constructor(private http: HttpClient) {
    this.getAllFiles();

  }
  getAllFiles() {
    this.http
      .get<Filee[]>(`${environment.apiEndpoint}/File/GetAll`)
      .subscribe((res) => {
        this.files = res;
      });
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

      // Get the URL value from the input field
     // const url = this.urlInputEl.nativeElement.value;
     // formData.append('url', url);

      // Send the file and URL to the backend API endpoint for upload and saving
      this.http.post<any>(`${environment.apiEndpoint}/File/UploadFile/upload`, formData).subscribe(
        (response) => {
          this.getAllFiles();
          console.log(response);
          alert('File uploaded and URL saved successfully');
        },
        (error) => {
          console.error('Failed to upload file and save URL:', error);
          alert('Failed to upload file and save URL');
        }
      );
    }
  }

  saveUrl() {
    const url = this.urlInputEl.nativeElement.value;

    // Send the URL to the API endpoint for saving
    this.http
      .post<any>(`${environment.apiEndpoint}/File/SaveUrl?url=${this.urlInputEl.nativeElement.value}`, { url })
      .subscribe(
        (response) => {
          this.getAllFiles();
          console.log(response);
          alert('URL saved successfully');
        },
        (error) => {
          console.error('Failed to save URL:', error);
          alert('Failed to save URL');
        }
      );

    // Reset the Url input field
    this.urlInputEl.nativeElement.value = null;
  }
}
export interface Filee {
  filePath: string;
  url: string;

}
