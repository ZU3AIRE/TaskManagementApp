import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  progress!: number;
  message!: string;
  fileUrl: string = '';

  fileNames: any;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllImages();
  }

  uploadFileBySystem(files: any) {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http
      .post('https://localhost:7120/api/FileSaving/UploadBySystem', formData)
      .subscribe({
        next: (response: any) => {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(response.dbPath);
          setTimeout(() => {
            this.message = '';
          }, 3000);
          this.getAllImages();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  uploadFileFromUrl() {
    if (!this.fileUrl) {
      return;
    }
    const formData = new FormData();
    formData.append('fileUrl', this.fileUrl);

    this.upload(formData);
  }

  upload(formData: FormData) {
    this.http
      .post('https://localhost:7120/api/FileSaving/UploadImg', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(
              (100 * event.loaded) / (event.total || 1)
            );
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            this.getAllImages();

            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  getAllImages() {
    this.http
      .get('https://localhost:7120/api/FileSaving/GetAllImages')
      .subscribe(
        (response) => {
          this.fileNames = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
