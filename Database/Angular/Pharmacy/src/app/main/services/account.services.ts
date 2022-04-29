import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom} from "rxjs";

import { BASE_URLSerVice } from "./baseurl.service";
import { Account } from "../entitites/account.entities";
import { Login } from "../entitites/login";




@Injectable()

export class AccountService{
 
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
    ){}

    async findAll(){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'findall');
        return await lastValueFrom(value);
    }
    async sendemail( email: string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'sendemail/'+email);
        return await lastValueFrom(value);
    }
    async create(account: Account) {
        var value = this.httpClient.post(this.BASE_URL.URLAccount() + 'create/', account);
        return await lastValueFrom(value);
    }

    async login(login: Login){
        var value = this.httpClient.post(this.BASE_URL.URLAccount() + 'login/',login);
        return await lastValueFrom(value);
    }

    async find(id : number){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'find/' + id);
        return await lastValueFrom(value);
    }

    async findUser(username : string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'findAccount/' + username);
        return await lastValueFrom(value);
    }

    async update(account : Account){
        var value = this.httpClient.put(this.BASE_URL.URLAccount() + 'update', account);
        return await lastValueFrom(value);
    }

    async changepassword(account : Account){
        var value = this.httpClient.put(this.BASE_URL.URLAccount() + 'changePassword', account);
        return await lastValueFrom(value);
    }

    async accountInfo(username: string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'accountInfo/' + username);
        return await lastValueFrom(value);
    }

    async active(id : number, checkCodeEmail: string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount() + 'checkcode/' + id + '/' + checkCodeEmail);
        return await lastValueFrom(value);
    }

    async findEmail(email : string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount()  + 'findEmail/' + email);
        return await lastValueFrom(value);
    }

    async checkrole(rolename : string){
        var value = this.httpClient.get(this.BASE_URL.URLAccount()  + 'checkrole/' + rolename);
        return await lastValueFrom(value);
    }



}