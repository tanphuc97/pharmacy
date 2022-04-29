import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from './entitites/account.entities';
import { AccountService } from './services/account.services';
import { CandidateService } from './services/candidate.service';
import { CartService } from './services/cart.service';


@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  title = 'Pharmacy';
  username : string;
  account : Account;
  checkForm: FormGroup;
  public totalItem:number=0;
  constructor(
    private router : Router,
    private accountService : AccountService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private candidateService:CandidateService
   
  ){}

  ngOnInit(){
   this.cartService.getProducts().subscribe(res=>{
     this.totalItem = res.length;
     
   })
    var username = localStorage.getItem('username');
    if(username != null){
      this.accountService.findUser(username).then(
        res =>{
          this.account = res as Account;
          this.username = this.account.username;
      
        },
        err =>{
          console.log(err);
        }
      )
    }
   

  }

  candidateLocate(){
    this.candidateService.findUser(this.account.id).then(
      res=>{
        
        if(res!=null){
          this.router.navigate(['/main/editcandidate',{id:this.account.id}]);
        }else{
          this.router.navigate(['/main/createcandidate',{id:this.account.id}]);
        }
      }
    )
  }
  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  checkAccount(){
    var username = localStorage.getItem('username');
    console.log(username);
    if(username != null){
      this.accountService.findUser(username).then(
        res =>{
          let account = res as Account;
          console.log(account.roleId);
          if(account.roleId == 1){
            this.router.navigate(['/admin'])
          }if(account.roleId == 2){
            this.router.navigate(['/career'])
          }return this.router.navigate(['/login'])
        },
        err =>{
          console.log(err);
        }
      )
    }
  }


}
