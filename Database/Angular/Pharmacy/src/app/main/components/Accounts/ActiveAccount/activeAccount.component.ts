import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";


@Component({
    templateUrl: './activeAccount.component.html',
})
   
export class ActiveAccountComponent implements OnInit{
  activeAccountForm : FormGroup;
  username : string;
  checkCodeEmail: string;
  account : Account;
  

    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router : Router,
        private activatedRoute : ActivatedRoute,
    ){}

    ngOnInit() {

      this.activatedRoute.paramMap.subscribe(p=>{
        var id=parseInt( p.get('id'));
        this.accountService.find(id).then(
            res=>{
                this.account = res as Account
            }
        )
      })    
    }

    save(){

        this.accountService.active(this.account.id, this.checkCodeEmail).then(
          res => {
            var re: Result = res as Result;
            if (re.result) {
              alert("Success")
              this.router.navigate(['./main/login'])
            }       
          },
          err => {
            alert('false');
          }
        );
    }

    
}