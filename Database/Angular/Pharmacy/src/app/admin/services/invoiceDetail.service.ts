import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { InvoiceDetail } from "../entities/invoiceDetail.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class InvoiceDetailService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/invoicedetail/';
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

    getId1(){
        let temp1 = this.invoiceId;
        this.clearData1();       
        return temp1;
    }

    getId2(){
        let temp2 = this.clientId;
        this.clearData2();       
        return temp2;
    }

    clearData1(){
        this.invoiceId = undefined;
    }
    clearData2(){
        this.clientId = undefined;
    }

    async find(id: number){
        var value = this.httpClient.get(this.baseurlService.URLInvoiceDetail()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLInvoiceDetail()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLInvoiceDetail()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(invoiceDetail: InvoiceDetail){
        var value = this.httpClient.post(this.baseurlService.URLInvoiceDetail()+ 'create', invoiceDetail);
        return await lastValueFrom(value);
    }

    async update(invoiceDetail: InvoiceDetail){
        var value = this.httpClient.put(this.baseurlService.URLInvoiceDetail()+ 'update', invoiceDetail);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLInvoiceDetail()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}