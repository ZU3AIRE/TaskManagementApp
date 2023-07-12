import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadimageService {

  constructor(private http:HttpClient) { }

  uploadImage(inputdata:any){
    return this.http.post('https://localhost:7120/api/file/UploadImage',inputdata)
  }
  uploadImagebyUrl(urlData:any){
    return this.http.post('https://localhost:7120/api/file/UploadImageByUrl',urlData)
  }

  getAllProducts(){
    return this.http.get('https://localhost:7120/api/file/GetAll')
  }
  deleteimage(imageFileId:number){
    return this.http.post<Boolean>('https://localhost:7120/api/file/DeleteById/'+ imageFileId,{})
  }
}
