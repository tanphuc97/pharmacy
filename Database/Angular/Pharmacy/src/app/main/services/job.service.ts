import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Job } from "../entitites/job.entity";






import { BASE_URLSerVice } from "./baseurl.service";



@Injectable()
export class JobService{
    
    //private BASE_URL: string = this.url.URL+'jobinformation';
    private SAVEFILE_URL: string = this.BASE_URL.URL_Upload();
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice,
        
    ){}
    async create (job : Job){
        
        var value= this.httpClient.post(this.BASE_URL.URLJob()+'create',job);
         return await lastValueFrom(value)
     }

     async searchbykeyword (keyword:string){
        
        var value= this.httpClient.get(this.BASE_URL.URLJob()+'searchbykeyword'+'/'+keyword);
         return await lastValueFrom(value)
     }

     async delete (id:number){   
        var value= this.httpClient.delete(this.BASE_URL.URLJob()+'delete'+'/'+id);
         return await lastValueFrom(value)
     }

     async find (id:number){
        
        var value= this.httpClient.get(this.BASE_URL.URLJob()+'find'+'/'+id);
         return await lastValueFrom(value)
     }
     async update (job : Job){
        
        var value= this.httpClient.put(this.BASE_URL.URLJob()+'update',job);
         return await lastValueFrom(value)
     }
  

     async findall (){
        var value= this.httpClient.get(this.BASE_URL.URLJob()+'findall');
         return await lastValueFrom(value)
     }

     async saveFile (file : File){
         var fd = new FormData();
         fd.append('file',file,file.name);
        var value= this.httpClient.post(this.SAVEFILE_URL,fd);
         return await lastValueFrom(value)
     }

}