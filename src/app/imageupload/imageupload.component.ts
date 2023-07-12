import { Component, OnInit } from '@angular/core';
import { UploadimageService } from '../upload/uploadimage.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  image:any;
  imageUrl:any;
  gallery:any;
  constructor(private service:UploadimageService){
    this.getAllImages();
  }
  ngOnInit() {
  }
  oninpchange(event:any){
    this.image=event.target.files[0];
  }
  uploadImage(){
    let formdata=new FormData();
    formdata.append("file", this.image)
    this.service.uploadImage(formdata).subscribe(res=>{
      if(res){
        alert("Image added Successfully")
        location.reload();
      }
      else{
        alert("Some issues for adding image")
      }
    })
  }
  uploadImageUsingUrl(url:any){
    // this.imageUrl=url
    // console.log(this.imageUrl)
    let formdata=new FormData();
    formdata.append("fileUrl", url)
    this.service.uploadImagebyUrl(formdata).subscribe(res=>{
      if(res){
        alert("Image added Successfully")
        location.reload();
      }
      else{
        alert("Some issues for adding image")
      }
    })
  }
  getAllImages(){
    this.service.getAllProducts().subscribe(
      (response)=>{
        this.gallery=response
        console.log(response)
      },
      (error)=>{
      }
    );
  }
  DeleteImage(imageFileId:number){
    console.log(imageFileId)
    this.service.deleteimage(imageFileId).subscribe(res=>{
      if(res){
        alert("Image is delete Successfully")
        location.reload();
      }
      else{
        alert("Image do not Exist");
        location.reload();
      }
    })
  }
}
