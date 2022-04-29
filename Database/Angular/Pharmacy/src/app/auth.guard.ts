import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './main/services/account.services';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  username : string;
  constructor(
    private accountService : AccountService,
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      if(localStorage.getItem('role') == "1"){
        return true;
      }else{
        return false;
      }
    console.log('canActivate', route, state);
    
  }
  
}
