import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Role } from "../entities/role.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class AboutUsService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/aboutus/';
    private id;
    constructor(
        private httpClient: HttpClient,
        private baseurlService: BASE_URLService
    ){}

    async find(){
        var value = this.httpClient.get(this.baseurlService.URLAboutUs()+ 'find');
        return await lastValueFrom(value);
    }
    
    async update(content: string){
        var value = this.httpClient.put(this.baseurlService.URLAboutUs()+ 'update', content);
        return await lastValueFrom(value);
    }


}