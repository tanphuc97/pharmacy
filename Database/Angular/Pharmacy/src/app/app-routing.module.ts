import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/components/Home/home.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  
   
    {path: '', component : MainComponent,children:[
      {path: '', component : HomeComponent}
    ]},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
