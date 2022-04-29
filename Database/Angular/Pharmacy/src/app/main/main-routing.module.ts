import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCareer } from '../auth.guardcareer';
import { AboutUsComponent } from '../main/components/AboutUs/aboutus.component';
import { ActiveAccountComponent } from './components/Accounts/ActiveAccount/activeAccount.component';
import { ChangePassword } from './components/Accounts/ChangePassword/changepassword.component';
import { LoginComponent } from './components/Accounts/Login/login.component';
import { ProfileComponent } from './components/Accounts/Profile/profile.component';
import { SendEmailComponent } from './components/Accounts/SendEmail/sendemail.component';
import { SignupComponent } from './components/Accounts/SignUp/signup.component';
import { EditCandidateComponent } from './components/Candidate/components/edit/editcandidate.component';
import { CreateCandidateComponent } from './components/Candidate/createcandidate.component';
import { DetailJobComponent } from './components/Career/components/detail/detail.component';
import { JobComponent } from './components/Career/job.component';
import { ClientComponent } from './components/Client/client.component';
import { ContactUsComponent } from './components/ContactUs/contactus.component';
import { FeedBackComponent } from './components/Feedback/feedback.component';
import { HomeComponent } from './components/Home/home.component';
import { DetailProductComponent } from './components/Product/components/details/detail.component';
import { ProductComponent } from './components/Product/product.component';
import { MainComponent } from './main.component';



const routes: Routes = [
 
 
    {path:'main',component: MainComponent,children:[
      {path: '', component : HomeComponent},
  
      {path: '', component : HomeComponent},
      {path: 'home', component : HomeComponent},
      {path: 'login', component : LoginComponent},
      {path: 'profile', component : ProfileComponent},
      {path: 'signup', component : SignupComponent},
      {path: 'aboutus', component : AboutUsComponent,},
      {path: 'contactus', component : ContactUsComponent,},
      {path: 'changepassword', component : ChangePassword},
      {path: 'sendemail', component : SendEmailComponent},
    
      {path: 'changepassword', component : ChangePassword},
      {path: 'activeaccount', component : ActiveAccountComponent},
      // {path: 'admin', component: AdminComponent, canActivate:[AuthGuard], children: [
      
      //   {path: 'product', component: ProductAdminComponent},
      //   {path: 'admincandidate', component: AdminCandidateComponent},
      
      // ]},
      {path: 'career', component: JobComponent, canActivate:[AuthGuardCareer] },
      {path: 'jobdetail', component: DetailJobComponent, canActivate:[AuthGuardCareer] },
    //  {path: 'candidate', component: CandidateComponent},
      {path: 'product', component: ProductComponent,children:[
        
      ]} ,
      {path: 'feedback', component: FeedBackComponent},
    //  {path: 'adminfeedback', component: AdminFeedbackComponent},
      {path: 'detailproduct', component: DetailProductComponent},
      {path: 'createcandidate', component: CreateCandidateComponent},
    
      {path: 'editcandidate', component: EditCandidateComponent},
      {path: 'client', component: ClientComponent},
  ]}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
