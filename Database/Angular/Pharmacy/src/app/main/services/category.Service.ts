import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { BASE_URLSerVice } from "./baseurl.service";

@Injectable()
export class CategoryService{

   
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
    ){}
    async findallTruetop5 (){
        var value= this.httpClient.get(this.BASE_URL.URLCategory()+'findalltruetop5');
         return await lastValueFrom(value)
     }


}