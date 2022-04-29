import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Client } from "../entitites/client.entity";
import { BASE_URLSerVice } from "./baseurl.service";


@Injectable()
export class ClientService{
   
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
    ){}
    async find(phonenumber:string){
        var value= this.httpClient.get(this.BASE_URL.URLClient()+'find'+'/'+phonenumber);
         return await lastValueFrom(value)
     }

     async create(client:Client){
        var value= this.httpClient.post(this.BASE_URL.URLClient()+'create',client);
         return await lastValueFrom(value)
     }
     async findlastest(){
        var value= this.httpClient.get(this.BASE_URL.URLClient()+'findlastest');
         return await lastValueFrom(value)
     }
}