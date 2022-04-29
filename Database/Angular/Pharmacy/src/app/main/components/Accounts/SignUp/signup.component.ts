import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/main/entitites/account.entities";
import { Result } from "src/app/main/entitites/result.entity";
import { AccountService } from "src/app/main/services/account.services";



@Component({
    templateUrl: './signup.component.html',
})

export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    date: string;

    
    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder,
        private router: Router,

    ){}
    
    ngOnInit(){
        this.date = "";
        this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        // phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
        password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],
       
        roleId: 3,
        status: true,
        
       
    })
}

    create(){
        var account : Account = this.registerForm.value;
        console.log(account.password);
        this.accountService.create(account).then(
            res =>{
                var re : Result = res as Result;
                console.log(re.result)
                if(re.result == true){
                    this.accountService.findEmail(account.email).then(
                        res =>{
                            var acc = res as Account;
                            console.log(acc);
                            this.router.navigate(['/main/activeaccount', {id: acc.id}]);
                        }
                    )
                } 
            },
            err =>{
                console.log(err);
                alert("signup false");
            }
        )

    }
}