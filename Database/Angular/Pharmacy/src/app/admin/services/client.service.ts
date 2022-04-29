import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Client } from "../entities/client.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class ClientService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/client/';
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
        var value = this.httpClient.get(this.baseurlService.URLClient()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLClient()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLClient()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(client: Client){
        var value = this.httpClient.post(this.baseurlService.URLClient()+ 'create', client);
        return await lastValueFrom(value);
    }

    async update(client: Client){
        var value = this.httpClient.put(this.baseurlService.URLClient()+ 'update', client);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLClient()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}