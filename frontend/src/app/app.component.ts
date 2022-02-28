import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Toxicity Monitor';

  response = ''

  ngOnInit() {
  }

  formGroup;

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
  ) {
    this.formGroup = this.formBuilder.group({
      sentence: ''
    });
  }

  onSubmit(formData) {
    let sentence = formData['sentence'];
    console.log(sentence)
    let j_data = JSON.stringify(sentence); 
    let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    headers.set('Content-Type','application/x-www-form-urlencoded; charset=utf-8');

    this.http.post<any>('http://localhost:3002', {sent : sentence}, {headers:headers}).subscribe({
        next: data => {
          console.log(data);
          //this.response = data.text();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }
}
