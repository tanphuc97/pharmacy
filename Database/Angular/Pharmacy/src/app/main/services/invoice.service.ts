import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Invoice } from "../entitites/invoice.entities";

import { InvoiceDetail } from "../entitites/invoiceDetail.entities";
import { BASE_URLSerVice } from "./baseurl.service";



@Injectable()
export class InvoiceService{
    private invoiceId;
    private clientId;
    constructor(
        private httpClient: HttpClient,
        private BASE_URL: BASE_URLSerVice
    ){}


    async create(invoice: Invoice){
        var value = this.httpClient.post(this.BASE_URL.URLInvoice()+ 'create',invoice);
        return await lastValueFrom(value);
    }
    async createDetail(invoiceDetail : InvoiceDetail){
        var value = this.httpClient.post(this.BASE_URL.URLInvoice()+ 'createdetail',invoiceDetail);
        return await lastValueFrom(value);
    }
    async createnew(clientId:number){
        var value = this.httpClient.get(this.BASE_URL.URLInvoice()+ 'createnew/'+clientId);
        return await lastValueFrom(value);
    }
    async createinvoicedetail(invoiceId:number,productId:number){
        var value = this.httpClient.get(this.BASE_URL.URLInvoice()+ 'createinvoicedetail/'+invoiceId+'/'+productId);
        return await lastValueFrom(value);
    }

}