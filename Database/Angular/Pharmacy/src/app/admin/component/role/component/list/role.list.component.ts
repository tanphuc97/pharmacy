import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Result } from "src/app/admin/entities/result.entity";
import { Role } from "src/app/admin/entities/role.entity";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './role.list.component.html',
})

export class RoleListComponent implements OnInit {
    
    roles: Role[];
    role: Role;
    keyword: string;
    display: boolean;
    
    constructor(
        private roleService: RoleService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.roleService.findAll().then(
            res => {
                this.roles = res as Role[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.roleService.search(this.keyword).then(
                res => {
                    this.roles = res as Role[];
                },
                err => {
                    console.log(err);
                });
        }
        this.roleService.search(this.keyword).then(
            res => {
                this.roles = res as Role[];
            },
            err => {
                console.log(err);
            });
    }

    openNew() {
       this.router.navigate(['/admin/role/add']);
    }

    update(id: number) {
        this.roleService.setId(id);
        this.router.navigate(['/admin/role/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this role?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.roleService.findAll().then(
                                res => {
                                    this.roles = res as Role[];
                                    
                                },
                                err => {
                                    console.log(err);
                    
                                });
                            
                        } else {
                            console.log('Failed');
                            this.display = true;
                        }
                        
                    },
                    err => {
                        console.log(err);
                    }
                );
                
            }
        });
        
        
    }
}