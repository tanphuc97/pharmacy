import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, Observable} from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BASE_URLSerVice } from "./baseurl.service";




@Injectable()

export class RoleService implements CanActivate{
   
    constructor(
        private httpClient: HttpClient,
        private BASE_URL : BASE_URLSerVice
        
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(localStorage.getItem('role') == "1"){
            return true;
        }else if (localStorage.getItem('role') == "2"){
            return true;
        }else if (localStorage.getItem('role') == "3"){
            return true;
        }
        return false;
    }

    async findAll(){
        var value = this.httpClient.get(this.BASE_URL.URLRole() + 'findall');
        return await lastValueFrom(value);
    }

    


}