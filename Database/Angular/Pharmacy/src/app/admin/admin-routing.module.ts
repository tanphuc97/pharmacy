import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { AdminComponent } from './admin.component';
import { AboutUsComponent } from './component/aboutUsContent/aboutus.component';

import { AccountComponent } from './component/account/account.component';
import { AccountDetailComponent } from './component/account/component/detail/account.detail.component';
import { AccountEditComponent } from './component/account/component/edit/account.edit.component';
import { AccountListComponent } from './component/account/component/list/account.list.component';
import { CandidateComponent } from './component/candidate/candidate.component';
import { CandidateDetailComponent } from './component/candidate/component/detail/candidate.detail.component';
import { CandidateEditComponent } from './component/candidate/component/edit/candidate.edit.component';
import { CandidateListComponent } from './component/candidate/component/list/candidate.list.component';
import { CategoryComponent } from './component/category/category.component';
import { CategoryAddComponent } from './component/category/component/add/category.add.component';
import { CategoryEditComponent } from './component/category/component/edit/category.edit.component';
import { CategoryListComponent } from './component/category/component/list/category.list.component';
import { ClientComponent } from './component/client/client.component';
import { ClientDetailComponent } from './component/client/component/detail/client.detail.component';
import { ClientEditComponent } from './component/client/component/edit/client.edit.component';
import { ClientListComponent } from './component/client/component/list/client.list.component';
import { FeedbackDetailComponent } from './component/feedback/component/detail/feedback.detail.component';
import { FeedbackEditComponent } from './component/feedback/component/edit/feedback.edit.component';
import { FeedbackListComponent } from './component/feedback/component/list/feedback.list.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { InvoiceListComponent } from './component/invoice/component/list/invoice.list.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailComponent } from './component/invoiceDetail/component/detail/invoiceDetail.detail.component';
import { JobAddComponent } from './component/job/component/add/job.add.component';
import { JobDetailComponent } from './component/job/component/detail/job.detail.component';
import { JobEditComponent } from './component/job/component/edit/job.edit.component';
import { JobListComponent } from './component/job/component/list/job.list.component';
import { JobComponent } from './component/job/job.component';
import { JobApplicationDetailComponent } from './component/jobApplication/component/detail/jobApplication.detail.component';
import { JobApplicationEditComponent } from './component/jobApplication/component/edit/jobApplication.edit.component';
import { JobApplicationListComponent } from './component/jobApplication/component/list/jobApplication.list.component';
import { JobApplicationComponent } from './component/jobApplication/jobApplication.component';
import { JobApplicationStatusAddComponent } from './component/jobApplicationStatus/component/add/jobApplicationStatus.add.component';
import { JobApplicationStatusEditComponent } from './component/jobApplicationStatus/component/edit/jobApplicationStatus.edit.component';
import { JobApplicationStatusListComponent } from './component/jobApplicationStatus/component/list/jobApplicationStatus.list.component';
import { JobApplicationStatusComponent } from './component/jobApplicationStatus/jobApplicationStatus.component';
import { ProductAddComponent } from './component/product/component/add/product.add.component';
import { ProductDetailComponent } from './component/product/component/detail/product.detail.component';
import { ProductEditComponent } from './component/product/component/edit/product.edit.component';
import { ProductListComponent } from './component/product/component/list/product.list.component';
import { ProductUploadComponent } from './component/product/component/upload/product.upload.component';
import { ProductComponent } from './component/product/product.component';
import { RoleAddComponent } from './component/role/component/add/role.add.component';
import { RoleEditComponent } from './component/role/component/edit/role.edit.component';
import { RoleListComponent } from './component/role/component/list/role.list.component';
import { RoleComponent } from './component/role/role.component';



const routes: Routes = [
  {path: 'admin', component: AdminComponent,canActivate:[AuthGuard], children: [
    {path: '', component: AccountComponent, children: [
      {path: '', component: AccountListComponent},
    ]},
    {path: 'account', component: AccountComponent, children: [
      {path: '', component: AccountListComponent},
      {path: 'list', component: AccountListComponent},
      {path: 'edit', component: AccountEditComponent},
      {path: 'detail', component: AccountDetailComponent},
    ]},    
    {path: 'candidate', component: CandidateComponent, children: [
      {path: '', component: CandidateListComponent},
      {path: 'list', component: CandidateListComponent},
      {path: 'edit', component: CandidateEditComponent},
      {path: 'detail', component: CandidateDetailComponent}
    ]},
    {path: 'category', component: CategoryComponent, children: [
      {path: '', component: CategoryListComponent},
      {path: 'list', component: CategoryListComponent},
      {path: 'edit', component: CategoryEditComponent},
      {path: 'add', component: CategoryAddComponent},
    ]},
    {path: 'client', component: ClientComponent, children: [
      {path: '', component: ClientListComponent},
      {path: 'list', component: ClientListComponent},
      {path: 'edit', component: ClientEditComponent},
      {path: 'detail', component: ClientDetailComponent}
    ]},
    {path: 'feedback', component: FeedbackComponent, children: [
      {path: '', component: FeedbackListComponent},
      {path: 'list', component: FeedbackListComponent},
      {path: 'edit', component: FeedbackEditComponent},
      {path: 'detail', component: FeedbackDetailComponent}
    ]},
    {path: 'invoice', component: InvoiceComponent, children: [
      {path: '', component: InvoiceListComponent},
      {path: 'list', component: InvoiceListComponent},
      {path: 'detail', component: InvoiceDetailComponent}
    ]},
    
    {path: 'job', component: JobComponent, children: [
      {path: '', component: JobListComponent},
      {path: 'list', component: JobListComponent},
      {path: 'edit', component: JobEditComponent},
      {path: 'add', component: JobAddComponent},
      {path: 'detail', component: JobDetailComponent}
    ]},
    {path: 'jobapplication', component: JobApplicationComponent, children: [
      {path: '', component: JobApplicationListComponent},
      {path: 'list', component: JobApplicationListComponent},
      {path: 'edit', component: JobApplicationEditComponent},
      {path: 'detail', component: JobApplicationDetailComponent}
    ]},
    {path: 'jobapplicationstatus', component: JobApplicationStatusComponent, children: [
      {path: '', component: JobApplicationStatusListComponent},
      {path: 'list', component: JobApplicationStatusListComponent},
      {path: 'edit', component: JobApplicationStatusEditComponent},
      {path: 'add', component: JobApplicationStatusAddComponent},
    ]},
    {path: 'product', component: ProductComponent, children: [
      {path: '', component: ProductListComponent},
      {path: 'list', component: ProductListComponent},
      {path: 'edit', component: ProductEditComponent},
      {path: 'add', component: ProductAddComponent},
      {path: 'detail', component: ProductDetailComponent},
      {path: 'upload', component: ProductUploadComponent},
    ]},
    {path: 'role', component: RoleComponent, children: [
      {path: '', component: RoleListComponent},
      {path: 'list', component: RoleListComponent},
      {path: 'edit', component: RoleEditComponent},
      {path: 'add', component: RoleAddComponent},
     
    ]},
    {path: "aboutus", component: AboutUsComponent},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
