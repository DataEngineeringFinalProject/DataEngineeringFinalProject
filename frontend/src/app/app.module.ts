import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
//import {MetricsComponent} from '@loopback/metrics';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //MetricsComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
