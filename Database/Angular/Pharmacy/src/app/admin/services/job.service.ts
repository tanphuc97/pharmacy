import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Job } from "../entities/job.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class JobService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/job/';
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
        var value = this.httpClient.get(this.baseurlService.URLJob()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLJob()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLJob()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(job: Job){
        var value = this.httpClient.post(this.baseurlService.URLJob()+ 'create', job);
        return await lastValueFrom(value);
    }

    async update(job: Job){
        var value = this.httpClient.put(this.baseurlService.URLJob()+ 'update', job);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLJob()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}