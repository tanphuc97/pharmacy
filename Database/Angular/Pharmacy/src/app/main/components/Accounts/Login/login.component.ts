import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";import { Login } from "src/app/main/entitites/login";
;
@Component({
    
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: string;
    roleId :number;
    check:boolean = true;
    constructor(
        private formBuilder : FormBuilder,
        private accountService : AccountService,
        private router: Router,
 
    ){}
    
    ngOnInit(){
        
        if(localStorage.getItem('username')!=null){
            this.router.navigateByUrl('/main/home');
        }
        this.loginForm= this.formBuilder.group({
            Username:['',Validators.required],
            Password:['',Validators.required],
            
        })     
    }

    Login() {
        var login:Login = {
            Username : this.loginForm.value.Username,
            Password : this.loginForm.value.Password
        }
        console.log(login);
        this.accountService.login(login).then(
          res => {
           var user: Account = res as Account
           console.log(user);
           console.log(user.roleId)
            if(user != null){
                this.username = user.username;
                this.roleId = user.roleId;
                localStorage.setItem('username', this.username);
                localStorage.setItem('role', String(this.roleId));
                localStorage.setItem('user',JSON.stringify(user));
                this.router.navigateByUrl('/main/home');

                window.location.reload();
            }
          },
          err => {
            console.log(err);
            alert("login false");
          }
        );
    }
}