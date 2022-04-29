import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from './admin/entities/account.entity';
import { AccountService } from './main/services/account.services';
import { CartService } from './main/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pharmacy';
  username : string;
  account : Account[];
  checkForm: FormGroup;
  public totalItem:number=0;
  constructor(
    private router : Router,
    private accountService : AccountService,
    private formBuilder: FormBuilder,
    private cartService: CartService
   
  ){}

  ngOnInit(){
  


}
}