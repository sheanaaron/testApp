import { Component} from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Label } from './label';
import { LabelList } from './labelList';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpClient: HttpClient) { }
    selectedFile: File;
    message: string = "";
    url = '';
    headers =  {headers: new  HttpHeaders({ 'Content-Type': ' application/json'})};
    labels: any;
    labelList: any;
    name: any;

    labelArray: Label[];
    one: Label;
    



     //Gets called when the user selects an image
  public onFileChanged(event:any) {
    
    //Select File
    if (event.target)
    this.selectedFile = event.target.files[0];
    
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result as string;
    }

  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    // uploadImageData.append('imageFile', this.selectedFile, this.imageName);
    uploadImageData.append('imageFile', this.selectedFile);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/api/upload', uploadImageData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );

    this.searcher();    
    }

    searcher() {
      //api for get request
      let apiURL = "http://localhost:8080/api/labels";

    return this.httpClient.get<LabelList>(apiURL, this.headers).subscribe((data: LabelList) => {
      console.log(data.list);
      this.labelList = data.list;
      data.list.forEach(result => console.log(result.issue + " " + result.confidence));
    });
    }

}
