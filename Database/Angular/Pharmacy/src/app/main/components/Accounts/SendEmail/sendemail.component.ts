import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";

@Component({
    templateUrl: './sendemail.component.html',
})
   
export class SendEmailComponent implements OnInit{
    sendemail : FormGroup;
account : Account
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router : Router,
    ){}

    ngOnInit() {
       this.sendemail  = this.formBuilder.group({
        
        email: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],

       })
    }

    save(){
       this.accountService.findEmail(this.sendemail.value.email).then(res=>{
         this.account = res as Account
        console.log(this.account)
         this.accountService.sendemail(this.account.email).then(
          res => {
            var re: Result = res as Result;
            if (re.result) {
              alert("Success")
              this.router.navigate(['./main/changepassword'])  
            } else {
              alert("Failed")
            }
                    
          },
          err => {
            alert('false');
          }
        );
        });
       
       
    }

    
}