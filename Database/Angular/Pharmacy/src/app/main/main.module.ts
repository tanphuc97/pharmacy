import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//prime ng
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {EditorModule} from 'primeng/editor';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { CommonModule } from '@angular/common';
import { AboutUsComponent } from '../main/components/AboutUs/aboutus.component';

import { ChangePassword } from './components/Accounts/ChangePassword/changepassword.component';
import { LoginComponent } from './components/Accounts/Login/login.component';
import { SignupComponent } from './components/Accounts/SignUp/signup.component';
import { ProfileComponent } from './components/Accounts/Profile/profile.component';

import { DetailJobComponent } from './components/Career/components/detail/detail.component';
import { ContactUsComponent } from './components/ContactUs/contactus.component';
import { HomeComponent } from './components/Home/home.component';
import { JobComponent } from './components/Career/job.component';
import { ProductComponent } from './components/Product/product.component';
import { DetailProductComponent } from './components/Product/components/details/detail.component';
import { SendEmailComponent } from './components/Accounts/SendEmail/sendemail.component';

import { FeedBackComponent } from './components/Feedback/feedback.component';
import { ActiveAccountComponent } from './components/Accounts/ActiveAccount/activeAccount.component';
import { MainRoutingModule } from './main-routing.module';
import { CandidateService } from './services/candidate.service';
import { ProductService } from './services/product.service';
import { ClientService } from './services/client.service';
import { FeedbackService } from './services/feedback.service';
import { JobService } from './services/job.service';
import { BASE_URLSerVice } from './services/baseurl.service';
import { AccountService } from './services/account.services';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.Service';
import { CreateCandidateComponent } from './components/Candidate/createcandidate.component';
import { EditCandidateComponent } from './components/Candidate/components/edit/editcandidate.component';
import { JobApplicationService } from './services/jobApplication.service';
import { ClientComponent } from './components/Client/client.component';
import { InvoiceService } from './services/invoice.service';
import { AboutUsService } from '../admin/services/aboutus.service';





@NgModule({
  declarations: [
    
    FeedBackComponent,
    AboutUsComponent,
    ActiveAccountComponent,
    ChangePassword,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    DetailJobComponent,
    ContactUsComponent,
    HomeComponent,
    JobComponent,
    ProductComponent,
    DetailProductComponent,
  
    SendEmailComponent,
    CreateCandidateComponent,
    EditCandidateComponent,
    ClientComponent,


  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    EditorModule,
    ConfirmDialogModule,
    InputSwitchModule,
    InputNumberModule,
    AutoCompleteModule,
    DialogModule,
    DropdownModule
    
    
 
  
  ],
  providers: [
    CandidateService,
    ProductService,
    ClientService,
    FeedbackService,
    JobService,
    BASE_URLSerVice,
    ConfirmationService,
    AccountService,
    CartService,
    CategoryService,
    JobApplicationService,
    InvoiceService,
    AboutUsService
    
  ],
  bootstrap: [],

})
export class MainModule { }
