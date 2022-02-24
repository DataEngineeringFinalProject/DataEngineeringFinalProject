import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Toxicity Monitor';

  back = 'http://localhost:3000';



  ngOnInit() {

  }

  formGroup;

  constructor(
    private formBuilder: FormBuilder, http: HttpClient
  ) {
    this.formGroup = this.formBuilder.group({
      sentence: ''
    });
  }

  onSubmit(formData) {
    var name = formData['sentence'];
  }
}
