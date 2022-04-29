import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { lastValueFrom } from "rxjs";
import { Candidate } from "../entitites/candidate.entity";

import { BASE_URLSerVice } from "./baseurl.service";



@Injectable()
export class CandidateService{

    private id;
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
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
    
    private SAVEFILE_URL: string = this.BASE_URL.URL_Upload();
    async create (candidate : Candidate){
        
        var value= this.httpClient.post(this.BASE_URL.URLCandidate()+'create',candidate);
         return await lastValueFrom(value)
     }

     async delete (id : number){
        
        var value= this.httpClient.delete(this.BASE_URL.URLCandidate()+'delete'+'/'+id);
         return await lastValueFrom(value)
     }

     async find (id: number){
        var value= this.httpClient.get(this.BASE_URL.URLCandidate()+'find'+'/'+id);
         return await lastValueFrom(value)
     }
      async findUser (accountid: number){
        var value= this.httpClient.get(this.BASE_URL.URLCandidate()+'finduser'+'/'+accountid);
         return await lastValueFrom(value)
     }

     async findLastestCandi (){
        var value= this.httpClient.get(this.BASE_URL.URLCandidate()+'findlastest');
         return await lastValueFrom(value)
     }
     async update (candidate: Candidate){
        var value= this.httpClient.put(this.BASE_URL.URLCandidate()+'update',candidate);
         return await lastValueFrom(value)
     }


     async findall (){
        var value= this.httpClient.get(this.BASE_URL.URLCandidate()+'findall');
         return await lastValueFrom(value)
     }
     async searchbykeyword(keyword:string){
        var value= this.httpClient.get(this.BASE_URL.URLCandidate()+'searchbykeyword'+'/'+keyword);
         return await lastValueFrom(value)
     }

     async saveFile (file : File){
         var fd = new FormData();
         fd.append('file',file,file.name);
        var value= this.httpClient.post(this.SAVEFILE_URL,fd);
         return await lastValueFrom(value)
     }

    

    async uploadPhoto(id:number,formData: FormData){
        var value = this.httpClient.post(this.BASE_URL.URLCandidate()+ 'uploadphoto/'+id, formData);
        return await lastValueFrom(value);
    }

    async uploadCV(id:number,formData: FormData){
        var value = this.httpClient.post(this.BASE_URL.URLCandidate()+ 'uploadcv/'+id, formData);
        return await lastValueFrom(value);
    }
    
}