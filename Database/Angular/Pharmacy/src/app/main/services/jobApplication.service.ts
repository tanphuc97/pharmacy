import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { JobApplication } from "../entitites/jobaplication.entities";
import { BASE_URLSerVice } from "./baseurl.service";




@Injectable()
export class JobApplicationService{

 

    private jobId;
    private candidateId;

    constructor(
        private httpClient: HttpClient,
        private baseurlService: BASE_URLSerVice
    ){}

    setId(jobId, candidateId){
        this.jobId = jobId;
        this.candidateId = candidateId;
    }

    getId1(){
        let temp1 = this.jobId;
        this.clearData1();       
        return temp1;
    }

    getId2(){
        let temp2 = this.candidateId;
        this.clearData2();       
        return temp2;
    }

    clearData1(){
        this.jobId = undefined;
    }
    clearData2(){
        this.candidateId = undefined;
    }

    async find(jobId: number, candidateId: number){
        var value = this.httpClient.get(this.baseurlService.URLJobApplication()+ 'find/' + jobId + '/' + candidateId);
        return await lastValueFrom(value);
    }

    async findByCandiateId(candidateId: number){
        var value = this.httpClient.get(this.baseurlService.URLJobApplication()+ 'findbycandidateid/' + candidateId);
        return await lastValueFrom(value);
    }

    async findByJobId(jobId: number){
        var value = this.httpClient.get(this.baseurlService.URLJobApplication()+ 'findbyjobid/' + jobId);
        return await lastValueFrom(value);
    }

    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLJobApplication()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLJobApplication()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(jobApplication: JobApplication){
        var value = this.httpClient.post(this.baseurlService.URLJobApplication()+ 'create', jobApplication);
        return await lastValueFrom(value);
    }

    async update(jobApplication: JobApplication){
        var value = this.httpClient.put(this.baseurlService.URLJobApplication()+ 'update', jobApplication);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLJobApplication()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

    async send(email: any){
        var value = this.httpClient.post(this.baseurlService.URLJobApplication()+ 'send', email);
        return await lastValueFrom(value);
    }

}