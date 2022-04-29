import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Account } from "../entities/account.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class AccountService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/account/';
    private id;
    constructor(
        private httpClient: HttpClient,
        private baseurlService: BASE_URLService
    ){}

    setId(id){
        this.id = id;
    }

    getId(){
        let temp = this.id;
        this.clearData();       
        return temp;
    }

    clearData(){
        this.id = undefined;
    }

    async find(id: number){
        var value = this.httpClient.get(this.baseurlService.URLAccount() + 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLAccount()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLAccount()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(account: Account){
        var value = this.httpClient.post(this.baseurlService.URLAccount()+ 'create', account);
        return await lastValueFrom(value);
    }

    async update(account: Account){
        var value = this.httpClient.put(this.baseurlService.URLAccount()+ 'update', account);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLAccount()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}