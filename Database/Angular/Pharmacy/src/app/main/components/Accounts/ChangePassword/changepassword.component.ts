import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";

@Component({
    templateUrl: './changepassword.component.html',
})
   
export class ChangePassword implements OnInit{
    email : string;
    code: string;
    password: string;
    changepasswordForm : FormGroup;

    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router : Router,
    ){}

    ngOnInit() {
       this.changepasswordForm  = this.formBuilder.group({
        // username : ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],
        email: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],
        code : ['',[Validators.required]]
       })
    }

    save(){
        var account: Account = this.changepasswordForm.value;
        console.log(account);
        this.accountService.changepassword(account).then(
          res => {
            var re: Result = res as Result;
            if (re.result) {
              alert("Success")
              this.router.navigate(['./main/login'])  
            } else {
              alert("Failed")
            }
                    
          },
          err => {
            alert('false');
          }
        );
    }

    
}