import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Client } from "src/app/admin/entities/client.entity";
import { ClientService } from "src/app/admin/services/client.service";

@Component({
    
    templateUrl: './client.edit.component.html',
})

export class ClientEditComponent implements OnInit {
    
    id: any;
    editClientForm: FormGroup;
    display : boolean = false;
    client: any;
    
    constructor(
        private clientService: ClientService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
    ){}

    ngOnInit() {
        this.id = this.clientService.getId();
        this.clientService.find(this.id).then(
            res => {
                this.client = res as Client;
                this.editClientForm = this.formbuilder.group({
                    id: this.client.id,
                    name: [this.client.name, [Validators.required, Validators.maxLength(250)]],
                    address: [this.client.address,  [Validators.required, Validators.maxLength(250)]],
                    city: [this.client.city,  [Validators.required, Validators.maxLength(250)]],
                    country: [this.client.country,  [Validators.required, Validators.maxLength(250)]],
                    emailAddress: [this.client.emailAddress,  [Validators.required, Validators.maxLength(250)]],
                    phone: [this.client.phone,  [Validators.required, Validators.maxLength(20)]],
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/client/list']);
    }

    detail() {
        this.clientService.setId(this.client.id);
        this.router.navigate(['/admin/client/detail']);
    }

    update(){
        var client: Client = this.editClientForm.value;
        this.clientService.update(client).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }
}