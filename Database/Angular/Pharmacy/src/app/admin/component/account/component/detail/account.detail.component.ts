import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/admin/entities/account.entity";
import { Role } from "src/app/admin/entities/role.entity";
import { AccountService } from "src/app/admin/services/account.service";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './account.detail.component.html',

})

export class AccountDetailComponent implements OnInit {
    
    id: any;    
    account: any;
    AccountForm: FormGroup;
    roles: Role[];
    role: Role;

    constructor(
        private accountService: AccountService,
        private roleService: RoleService,
        private router: Router,
        private formbuilder: FormBuilder
       
    ){}

    ngOnInit() {
        this.id = this.accountService.getId();
        this.accountService.find(this.id).then(
            res => {
                this.account = res as Account;
                console.log(this.account);
            },
            err => {
                console.log(err);
            });
                
    }

    backToList(){
        this.router.navigate(['/admin/account/list']);
    }

    update() {
        this.accountService.setId(this.account.id);
        this.router.navigate(['/admin/account/edit']);
    }

}

