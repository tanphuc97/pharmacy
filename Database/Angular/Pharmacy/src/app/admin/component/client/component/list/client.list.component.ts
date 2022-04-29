import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Client } from "src/app/admin/entities/client.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { ClientService } from "src/app/admin/services/client.service";

@Component({
    
    templateUrl: './client.list.component.html',
})

export class ClientListComponent implements OnInit {
    
    clients: Client[];
    client: Client;
    keyword: string;
    display: boolean;
    
    constructor(
        private clientService: ClientService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.clientService.findAll().then(
            res => {
                this.clients = res as Client[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.clientService.search(this.keyword).then(
                res => {
                    this.clients = res as Client[];
                },
                err => {
                    console.log(err);
                });
        }
        this.clientService.search(this.keyword).then(
            res => {
                this.clients = res as Client[];
            },
            err => {
                console.log(err);
            });
    }

    detail(id: number) {
        this.clientService.setId(id);
        this.router.navigate(['/admin/client/detail']);
    }

    update(id: number) {
        this.clientService.setId(id);
        this.router.navigate(['/admin/client/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this client?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.clientService.findAll().then(
                                res => {
                                    this.clients = res as Client[];
                                    
                                },
                                err => {
                                    console.log(err);
                                    this.display = true;
                    
                                });
                            
                        } else {
                            console.log('Failed');
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