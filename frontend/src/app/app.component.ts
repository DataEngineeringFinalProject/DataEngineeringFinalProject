import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Toxicity Monitor';
  formGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      sentence: ''
    });
  }

  onSubmit(formData) {
    var name = formData['sentence'];
  }
}