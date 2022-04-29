import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "src/app/admin/entities/client.entity";
import { ClientService } from "src/app/admin/services/client.service";
import { InvoiceService } from "src/app/admin/services/invoice.service";
import { InvoiceDetailService } from "src/app/admin/services/invoiceDetail.service";
import { ProductService } from "src/app/admin/services/product.service";
@Component({
    
    templateUrl: './invoiceDetail.detail.component.html',

})

export class InvoiceDetailComponent implements OnInit {
    
    invoices: any[];
    invoice: any;
    invoiceId: any;
    clientId: any;
    total: number;
    client: any;
    productPhotos: any;

    
    constructor(
        private productService: ProductService,
        private invoiceDetailService: InvoiceDetailService,
        private clientService: ClientService,
        private router: Router
    ){}

    ngOnInit() {

        this.invoiceId = this.invoiceDetailService.getId1();
        this.clientId = this.invoiceDetailService.getId2();

        this.invoiceDetailService.find(this.invoiceId).then(
            res => {
                this.invoices = res['invoiceDetail'];
                this.total = res['total'] as number;
                this.clientService.find(this.clientId).then(
                    res => {
                        this.client = res as Client;
                    },
                    err => {
                        console.log(err);
                    }
                );
                

            },
            err => {
                console.log(err);
            });
    }    
    
    backToList(){
        this.router.navigate(['/admin/invoice/list']);
    }

}

