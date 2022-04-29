import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Role } from "../entities/role.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class RoleService{

    private BASE_URL: string = 'http://localhost:5127/api/admin/role/';
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
        var value = this.httpClient.get(this.baseurlService.URLRole()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLRole()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLRole()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(role: Role){
        var value = this.httpClient.post(this.baseurlService.URLRole()+ 'create', role);
        return await lastValueFrom(value);
    }

    async update(role: Role){
        var value = this.httpClient.put(this.baseurlService.URLRole()+ 'update', role);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLRole()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

}