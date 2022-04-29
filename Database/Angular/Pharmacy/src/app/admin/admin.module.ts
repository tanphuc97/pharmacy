import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AccountService } from './services/account.service';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AccountComponent } from './component/account/account.component';
import { AccountEditComponent } from './component/account/component/edit/account.edit.component';
import { AccountListComponent } from './component/account/component/list/account.list.component';
import { CandidateComponent } from './component/candidate/candidate.component';
import { CandidateEditComponent } from './component/candidate/component/edit/candidate.edit.component';
import { CandidateListComponent } from './component/candidate/component/list/candidate.list.component';
import { CategoryComponent } from './component/category/category.component';
import { CategoryAddComponent } from './component/category/component/add/category.add.component';
import { CategoryEditComponent } from './component/category/component/edit/category.edit.component';
import { CategoryListComponent } from './component/category/component/list/category.list.component';
import { ClientComponent } from './component/client/client.component';
import { ClientEditComponent } from './component/client/component/edit/client.edit.component';
import { ClientListComponent } from './component/client/component/list/client.list.component';
import { FeedbackEditComponent } from './component/feedback/component/edit/feedback.edit.component';
import { FeedbackListComponent } from './component/feedback/component/list/feedback.list.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { InvoiceListComponent } from './component/invoice/component/list/invoice.list.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { JobAddComponent } from './component/job/component/add/job.add.component';
import { JobEditComponent } from './component/job/component/edit/job.edit.component';
import { JobListComponent } from './component/job/component/list/job.list.component';
import { JobComponent } from './component/job/job.component';
import { JobApplicationEditComponent } from './component/jobApplication/component/edit/jobApplication.edit.component';
import { JobApplicationListComponent } from './component/jobApplication/component/list/jobApplication.list.component';
import { JobApplicationComponent } from './component/jobApplication/jobApplication.component';
import { JobApplicationStatusAddComponent } from './component/jobApplicationStatus/component/add/jobApplicationStatus.add.component';
import { JobApplicationStatusEditComponent } from './component/jobApplicationStatus/component/edit/jobApplicationStatus.edit.component';
import { JobApplicationStatusListComponent } from './component/jobApplicationStatus/component/list/jobApplicationStatus.list.component';
import { JobApplicationStatusComponent } from './component/jobApplicationStatus/jobApplicationStatus.component';
import { ProductAddComponent } from './component/product/component/add/product.add.component';
import { ProductEditComponent } from './component/product/component/edit/product.edit.component';
import { ProductListComponent } from './component/product/component/list/product.list.component';
import { ProductComponent } from './component/product/product.component';
import { RoleAddComponent } from './component/role/component/add/role.add.component';
import { RoleEditComponent } from './component/role/component/edit/role.edit.component';
import { RoleListComponent } from './component/role/component/list/role.list.component';
import { RoleComponent } from './component/role/role.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {EditorModule} from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {GalleriaModule} from 'primeng/galleria';

import { ClientService } from './services/client.service';
import { CandidateService } from './services/candidate.service';
import { CategoryService } from './services/category.service';
import { FeedbackService } from './services/feedback.service';
import { InvoiceService } from './services/invoice.service';
import { InvoiceDetailService } from './services/invoiceDetail.service';
import { JobService } from './services/job.service';
import { JobApplicationService } from './services/jobApplication.service';
import { JobApplicationStatusService } from './services/jobApplicationStatus.service';
import { ProductService } from './services/product.service';
import { RoleService } from './services/role.service';
import { AccountDetailComponent } from './component/account/component/detail/account.detail.component';
import { CandidateDetailComponent } from './component/candidate/component/detail/candidate.detail.component';
import { ClientDetailComponent } from './component/client/component/detail/client.detail.component';
import { FeedbackDetailComponent } from './component/feedback/component/detail/feedback.detail.component';
import { JobDetailComponent } from './component/job/component/detail/job.detail.component';
import { JobApplicationDetailComponent } from './component/jobApplication/component/detail/jobApplication.detail.component';
import { ProductDetailComponent } from './component/product/component/detail/product.detail.component';
import { InvoiceDetailComponent } from './component/invoiceDetail/component/detail/invoiceDetail.detail.component';
import { BASE_URLService } from './services/baseurl.service';
import { AboutUsComponent } from './component/aboutUsContent/aboutus.component';
import { AboutUsService } from './services/aboutus.service';





@NgModule({
  declarations: [     
    AdminComponent,
    AccountComponent,
    AccountEditComponent,
    AccountListComponent,
    AccountDetailComponent,
    CandidateComponent,
    CandidateEditComponent,
    CandidateListComponent,
    CandidateDetailComponent,
    CategoryComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ClientComponent,
    ClientEditComponent,
    ClientListComponent,
    ClientDetailComponent,
    FeedbackComponent,
    FeedbackEditComponent,
    FeedbackListComponent,
    FeedbackDetailComponent,
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    JobComponent,
    JobEditComponent,
    JobAddComponent,
    JobListComponent,
    JobDetailComponent,
    JobApplicationComponent,
    JobApplicationEditComponent,
    JobApplicationListComponent,
    JobApplicationDetailComponent,
    JobApplicationStatusComponent,
    JobApplicationStatusEditComponent,
    JobApplicationStatusAddComponent,
    JobApplicationStatusListComponent,
    ProductComponent,
    ProductEditComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductDetailComponent,
    RoleComponent,
    RoleEditComponent,
    RoleAddComponent,
    RoleListComponent,
    AboutUsComponent
      
  ],
  imports: [
    BrowserModule,    
    FormsModule, 
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    ButtonModule,
    EditorModule,
    DialogModule,
    FileUploadModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    GalleriaModule
    
        
  ],
  providers: [
    AccountService,
    ClientService,
    CandidateService,
    CategoryService,
    FeedbackService,
    InvoiceService,
    InvoiceDetailService,
    JobService,
    JobApplicationService,
    JobApplicationStatusService,
    ProductService,
    RoleService,
    ConfirmationService,
    MessageService,
    BASE_URLService,
    AboutUsService
  ],
  bootstrap: []
})
export class AdminModule { }
