import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Product } from "../entitites/product.entity";

import { BASE_URLSerVice } from "./baseurl.service";

@Injectable()
export class ProductService{
  
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice,
    
    ){}
    async findall (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findall');
         return await lastValueFrom(value)
     }
     async findalltrue (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findalltrue');
         return await lastValueFrom(value)
     }
     async findallfalse (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findallfalse');
         return await lastValueFrom(value)
     }

     async findalltop8 (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findalltop8');
         return await lastValueFrom(value)
     }
     async findalltop3 (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findalltop3');
         return await lastValueFrom(value)
     }
     async findallPricetop8 (){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findallPricetop8');
         return await lastValueFrom(value)
     }
    async showproduct (phonenumber:string){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'showproduct'+'/'+phonenumber);
         return await lastValueFrom(value)
     }
     async find (phonenumber:string){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'find'+'/'+phonenumber);
         return await lastValueFrom(value)
     }
     async findid(id:number){
        var value= this.httpClient.get(this.BASE_URL.URLProduct()+'findid'+'/'+id);
        return await lastValueFrom(value)
     }
     async search(min: string, max: string){
        var value = this.httpClient.get(this.BASE_URL.URLProduct() + 'search/' + min + '/' + max);
        return await lastValueFrom(value);
    }

    async searchName(name : string){
        var value = this.httpClient.get(this.BASE_URL.URLProduct() + 'searchName/' + name);
        return await lastValueFrom(value);
    }

    async searchCategory (name: string){
        var value = this.httpClient.get(this.BASE_URL.URLProduct() + 'searchCategory/' + name);
        return await lastValueFrom(value);
    }

    async create(product : Product){
        var value = this.httpClient.post(this.BASE_URL.URLProduct() + 'create', product);
        return await lastValueFrom(value);
    }

 



}