import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";

@Component({
    templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
    updateUserForm : FormGroup;
    username: string;
    account : Account;
    id:number;
    user: string;
    pass:string;
    dob: Date;
    fulln: string
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router : Router
    ){}
    
    ngOnInit(){    
        this.username = localStorage.getItem('username');
        this.accountService.findUser(this.username).then(
            res => {
                var account = res as Account;
                console.log(account.username);
                this.updateUserForm = this.formBuilder.group({
                    username : [account.username, [Validators.required]],
             
                    password: [account.password, [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],
                    email: [account.email, [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
                
                   
                })
               
            },
            err => {
                console.log(err);
            }
        );   
    }
    
    save() {
        // this.updateUserForm.value.username = localStorage.getItem('username'); 
        // console.log(account.username);
        var account: Account = this.updateUserForm.value;
     
        // console.log(typeof(account.gender))
        // console.log(account);
        this.accountService.update(account).then(
          res => {
            var re: Result = res as Result;
            if (re.result) {
              alert("Success")
            } else {
              alert("Failed")
            }
            // this.router.navigate(['./profile'])
            
          },
          err => {
            alert('false');
          }
        );
      }
}