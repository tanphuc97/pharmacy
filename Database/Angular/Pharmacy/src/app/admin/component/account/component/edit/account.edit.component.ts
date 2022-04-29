import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Account } from "src/app/admin/entities/account.entity";
import { Role } from "src/app/admin/entities/role.entity";
import { AccountService } from "src/app/admin/services/account.service";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './account.edit.component.html',
})

export class AccountEditComponent implements OnInit {
    
    id: any;
    editAccountForm: FormGroup;
    display : boolean = false;
    account: Account;
    role: Role;
    roles: Role[];

    constructor(
        private accountService: AccountService,
        private roleService: RoleService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.accountService.getId();
        this.accountService.find(this.id).then(
            res => {
                this.account = res as Account;
                this.roleService.findAll().then(
                    res => {
                        this.roles = res as Role[];
                    },
                    err => {
                        console.log(err);
                    });
                this.editAccountForm = this.formbuilder.group({
                    id: this.account.id,
                    username: [this.account.username, [Validators.required, Validators.maxLength(250)]],
                    roleId: this.account.roleId,
                    status: this.account.status,
                    email: [this.account.email, [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]]
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/account/list']);
    }

    update(){
        var account: Account = this.editAccountForm.value;
        this.accountService.update(account).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

    detail() {
        this.accountService.setId(this.account.id);
        this.router.navigate(['/admin/account/detail']);
    }

}