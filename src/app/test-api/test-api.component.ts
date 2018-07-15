import { Component } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpResponse,
  HttpRequest } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestApiComponent  {
  file: File;
  fileName = '';
  responseCheck = '';
  token: string;
  progress: number;
  constructor(private http: HttpClient,
    private authService: AuthService,
    private sb: MatSnackBar) { }


  async postFile() {
    const formData: FormData = new FormData();

    formData.append('file', this.file, this.file.name);
    try {
      this.token = await this.authService.getIdToken();
    } catch (e) {
      this.token = ' '; // Useless but is for demonstration purpose
    }
    const headersReq = new HttpHeaders({ 'Authorization': this.token });
    const req = new HttpRequest('POST', 'http://localhost:4000/upload', formData, {
      headers: headersReq,
      reportProgress: true
    });
    this.http.request(req).subscribe(event => {
      // Via this API, you get access to the raw event stream.
      // Progress event:
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${this.progress}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.showMessage('File uploaded!');
      }
    }, err => {
      this.showMessage(err.message);
    });
  }

  async checkAPI() {
    try {
      this.token = await this.authService.getIdToken();
    } catch (e) {
      this.token = ' '; // Useless but is for demonstration purpose
    }
    const headersReq = new HttpHeaders({ 'Authorization': this.token });
    const req = new HttpRequest('GET', 'http://localhost:4000/restricted', {
      headers: headersReq,
      responseType: 'text'
    });
    this.http.request(req).subscribe((res: any) => {
      console.log(res);
      this.responseCheck = res.body;
      console.log(this.responseCheck);
    }, err => {
      console.log(err);
      this.responseCheck = err.error;
    });
  }

  selectedFile(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  showMessage(message: string) {
    this.sb.open(message, null, {
      duration: 3000
    });
  }
}

