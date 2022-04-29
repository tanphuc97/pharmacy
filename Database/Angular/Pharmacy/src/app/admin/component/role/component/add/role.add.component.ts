import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Role } from "src/app/admin/entities/role.entity";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './role.add.component.html',
})

export class RoleAddComponent implements OnInit {
    
    
    addRoleForm: FormGroup;
    display : boolean = false;

    constructor(
        private roleService: RoleService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.addRoleForm = this.formbuilder.group({
            name: ["", [Validators.required, Validators.maxLength(250)]],
            status: true
        });
        
    }

    backToList(){
        this.router.navigate(['/admin/role/list']);
    }

    create(){
        var role: Role = this.addRoleForm.value;

        this.roleService.create(role).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}