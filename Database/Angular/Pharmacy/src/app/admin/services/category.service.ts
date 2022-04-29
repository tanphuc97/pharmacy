import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Category } from "../entities/category.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class CategoryService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/category/';
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
        var value = this.httpClient.get(this.baseurlService.URLCategory()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLCategory()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLCategory()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(category: Category){
        var value = this.httpClient.post(this.baseurlService.URLCategory()+ 'create', category);
        return await lastValueFrom(value);
    }

    async update(category: Category){
        var value = this.httpClient.put(this.baseurlService.URLCategory()+ 'update', category);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLCategory()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}