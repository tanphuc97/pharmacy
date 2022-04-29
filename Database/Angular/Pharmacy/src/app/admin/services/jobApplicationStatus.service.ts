import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { JobApplicationStatus } from "../entities/jobApplicationStatus.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class JobApplicationStatusService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/jobapplicationstatus/';
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
        var value = this.httpClient.get(this.baseurlService.URLJobApplicationStatus()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLJobApplicationStatus()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLJobApplicationStatus()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(jobApplicationStatus: JobApplicationStatus){
        var value = this.httpClient.post(this.baseurlService.URLJobApplicationStatus()+ 'create', jobApplicationStatus);
        return await lastValueFrom(value);
    }

    async update(jobApplicationStatus: JobApplicationStatus){
        var value = this.httpClient.put(this.baseurlService.URLJobApplicationStatus()+ 'update', jobApplicationStatus);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLJobApplicationStatus()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}