import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { MainModule } from './main/main.module';






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainModule,
    AdminModule
  
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
