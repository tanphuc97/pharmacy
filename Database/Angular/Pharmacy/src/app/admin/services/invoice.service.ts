import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Invoice } from "../entities/invoice.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class InvoiceService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/invoice/';
    private invoiceId;
    private clientId;
    constructor(
        private httpClient: HttpClient,
        private baseurlService: BASE_URLService
    ){}

    setId(invoiceId, clientId){
        this.invoiceId = invoiceId;
        this.clientId = clientId;
    }

    getId(){
        let temp1 = this.invoiceId;
        let temp2 = this.clientId;
        this.clearData();       
        return {temp1, temp2};
    }

    clearData(){
        this.invoiceId = undefined;
        this.clientId = undefined;
    }

    async find(id: number){
        var value = this.httpClient.get(this.baseurlService.URLInvoice()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLInvoice()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLInvoice()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(invoice: Invoice){
        var value = this.httpClient.post(this.baseurlService.URLInvoice()+ 'create', invoice);
        return await lastValueFrom(value);
    }

    async update(invoice: Invoice){
        var value = this.httpClient.put(this.baseurlService.URLInvoice()+ 'update', invoice);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLInvoice()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}