import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Feedback } from "../entities/feedback.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class FeedbackService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/feedback/';
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
        var value = this.httpClient.get(this.baseurlService.URLFeedback()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLFeedback()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLFeedback()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(feedback: Feedback){
        var value = this.httpClient.post(this.baseurlService.URLFeedback()+ 'create', feedback);
        return await lastValueFrom(value);
    }

    async update(feedback: Feedback){
        var value = this.httpClient.put(this.baseurlService.URLFeedback()+ 'update', feedback);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLFeedback()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}