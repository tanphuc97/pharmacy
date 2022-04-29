import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Product } from "../entities/product.entity";
import { BASE_URLService } from "./baseurl.service";


@Injectable()
export class ProductService{

    private id ;
    

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
        var value = this.httpClient.get(this.baseurlService.URLProduct()+ 'find/' + id);
        return await lastValueFrom(value);
    }
    async findAll(){
        var value = this.httpClient.get(this.baseurlService.URLProduct()+ 'findall');
        return await lastValueFrom(value);
    }

    async search(keyword: string){
        var value = this.httpClient.get(this.baseurlService.URLProduct()+ 'search/' + keyword);
        return await lastValueFrom(value);
    }

    async create(product: Product){
        var value = this.httpClient.post(this.baseurlService.URLProduct()+ 'create', product);
        return await lastValueFrom(value);
    }

    async update(product: Product){
        var value = this.httpClient.put(this.baseurlService.URLProduct()+ 'update', product);
        return await lastValueFrom(value);
    }

    async delete(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLProduct()+ 'delete/' + id);
        return await lastValueFrom(value);
    }

    async uploadPhoto(id: number, formData: FormData){
        var value = this.httpClient.post(this.baseurlService.URLProduct()+ 'uploadphoto/'  + id, formData);
        return await lastValueFrom(value);
    }

    async deletePhoto(id: number){
        var value = this.httpClient.delete(this.baseurlService.URLProduct()+ 'deletephoto/' + id);
        return await lastValueFrom(value);
    }
    

}


