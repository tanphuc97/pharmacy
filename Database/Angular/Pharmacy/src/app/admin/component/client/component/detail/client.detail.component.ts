import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { Client } from "src/app/admin/entities/client.entity";
import { ClientService } from "src/app/admin/services/client.service";

@Component({
    
    templateUrl: './client.detail.component.html',

})

export class ClientDetailComponent implements OnInit {
    
    id: any;
    client: any;
    
    constructor(
        private clientService: ClientService,
        private router: Router,
    ){}

    ngOnInit() {
        this.id = this.clientService.getId();
        this.clientService.find(this.id).then(
            res => {
                this.client = res as Client;
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/client/list']);
    }

    update() {
        this.clientService.setId(this.client.id);
        this.router.navigate(['/admin/client/edit']);
    }
}

