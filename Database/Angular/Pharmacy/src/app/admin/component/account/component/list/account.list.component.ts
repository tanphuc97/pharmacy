import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Account } from "src/app/admin/entities/account.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { AccountService } from "src/app/admin/services/account.service";

@Component({
    
    templateUrl: './account.list.component.html',
})

export class AccountListComponent implements OnInit {
    
    accounts: Account[];
    account: Account;
    keyword: string;
    display: boolean;
    
    constructor(
        private accountService: AccountService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.accountService.findAll().then(
            res => {
                this.accounts = res as Account[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.accountService.search(this.keyword).then(
                res => {
                    this.accounts = res as Account[];
                },
                err => {
                    console.log(err);
                });
        }
        this.accountService.search(this.keyword).then(
            res => {
                this.accounts = res as Account[];
            },
            err => {
                console.log(err);
            });
    }    

    update(id: number) {
        this.accountService.setId(id);
        this.router.navigate(['/admin/account/edit']);
    }

    detail(id: number) {
        this.accountService.setId(id);
        this.router.navigate(['/admin/account/detail']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Account?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.accountService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.accountService.findAll().then(
                                res => {
                                    this.accounts = res as Account[];
                                    
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