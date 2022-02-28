import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Toxicity Monitor';

  back = 'http://localhost:3000';

  response = ''



  formGroup;

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
  ) { }
    ngOnInit() {
    this.formGroup = this.formBuilder.group({
      sentence:['',[ Validators.required ]]
    });
  }


  onSubmit(formData) {
    let sentence = formData['sentence'];
    console.log(sentence)
    let j_data = JSON.stringify(sentence);
    let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    headers.set('Content-Type','application/x-www-form-urlencoded; charset=utf-8');

    this.http.post<any>('http://localhost:3000', {sent : sentence}, {headers:headers}).subscribe({
        next: data => {
          console.log(data);
          //this.response = data.text();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }
  isFormValid():boolean{
    return this.formGroup.valid;
  }
}
