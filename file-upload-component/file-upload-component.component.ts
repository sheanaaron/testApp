import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.css']
})
export class FileUploadComponentComponent implements OnInit {

  // http: HttpClient; 
  selectedFile!: File;
  imageFile !: Observable<File>;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

    

  onFileChanged(event: any) {
    const file = event.target.files[0]
  }

  onUpload() {
     // this.http is the injected HttpClient
  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.post('http://localhost:4200/image/', uploadData, {
    reportProgress: true,
    observe: 'events'
  })
    .subscribe(event => {
      console.log(event); // handle event here
    });

}
}
