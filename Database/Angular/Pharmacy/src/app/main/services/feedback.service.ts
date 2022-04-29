import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Feedback } from "../entitites/feedback.entitty";


import { BASE_URLSerVice } from "./baseurl.service";


@Injectable()
export class FeedbackService{
  
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
    ){}
    async create (feedback : Feedback){
        var value= this.httpClient.post(this.BASE_URL.URLFeedback()+'create',feedback);
         return await lastValueFrom(value)
     }

     async findall (){
        var value= this.httpClient.get(this.BASE_URL.URLFeedback()+'findall');
         return await lastValueFrom(value)
     }
     async find (id: number){
        var value= this.httpClient.get(this.BASE_URL.URLFeedback()+'find'+'/'+id);
         return await lastValueFrom(value)
     }
     async searchbykeyword(keyword:string){
        var value= this.httpClient.get(this.BASE_URL.URLFeedback()+'searchbykeyword'+'/'+keyword);
         return await lastValueFrom(value)
     }

}