import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Candidate } from "../entities/candidate.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class CandidateService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/candidate/';
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
        var value = this.httpClient.get(this.baseurlService.URLCandidate()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLCandidate()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLCandidate()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(candidate: Candidate){
        var value = this.httpClient.post(this.baseurlService.URLCandidate()+ 'create', candidate);
        return await lastValueFrom(value);
    }

    async update(candidate: Candidate){
        var value = this.httpClient.put(this.baseurlService.URLCandidate()+ 'update', candidate);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLCandidate()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

    async uploadCV(formData: FormData){
        var value = this.httpClient.post(this.baseurlService.URLCandidate()+ 'uploadcv/', formData);
        return await lastValueFrom(value);
    }

    async uploadPhoto(formData: FormData){
        var value = this.httpClient.post(this.baseurlService.URLCandidate()+ 'uploadphoto/', formData);
        return await lastValueFrom(value);
    }

    async deleteFile(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLCandidate()+ 'deletefile/' + id);
        return await lastValueFrom(value);
    }

}