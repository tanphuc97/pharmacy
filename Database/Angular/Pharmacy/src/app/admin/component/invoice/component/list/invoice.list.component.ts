import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Invoice } from "src/app/admin/entities/invoice.entity";
import { InvoiceService } from "src/app/admin/services/invoice.service";
import { InvoiceDetailService } from "src/app/admin/services/invoiceDetail.service";

@Component({
    
    templateUrl: './invoice.list.component.html',
})

export class InvoiceListComponent implements OnInit {
    
    invoices: Invoice[];
    invoice: Invoice;
    keyword: string;
    
    constructor(
        private invoiceService: InvoiceService,
        private invoiceDetailService: InvoiceDetailService,
        private router: Router
    ){}

    ngOnInit() {
        this.invoiceService.findAll().then(
            res => {
                this.invoices = res as Invoice[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.invoiceService.search(this.keyword).then(
                res => {
                    this.invoices = res as Invoice[];
                },
                err => {
                    console.log(err);
                });
        }
        this.invoiceService.search(this.keyword).then(
            res => {
                this.invoices = res as Invoice[];
            },
            err => {
                console.log(err);
            });
    }
    
    detail(invoiceId: number, clientId: number) {
        this.invoiceDetailService.setId(invoiceId, clientId);
        this.router.navigate(['/admin/invoice/detail']);
    }
    

}