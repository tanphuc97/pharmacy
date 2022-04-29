import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Role } from "src/app/admin/entities/role.entity";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './role.edit.component.html',
})

export class RoleEditComponent implements OnInit {
    
    id: any;
    editRoleForm: FormGroup;
    display : boolean = false;
    role: Role;

    constructor(
        private roleService: RoleService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.roleService.getId();
        this.roleService.find(this.id).then(
            res => {
                this.role = res as Role;
                this.editRoleForm = this.formbuilder.group({
                    id: this.role.id,
                    name: [this.role.name, [Validators.required, Validators.maxLength(250)]],
                    status: this.role.status
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/role/list']);
    }

    update(){
        var role: Role = this.editRoleForm.value;
        this.roleService.update(role).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}