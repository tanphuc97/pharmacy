import { Component, OnInit } from "@angular/core";
import { AccountService } from "./services/account.service";
import { Account } from "./entities/account.entity";

@Component({
    
    templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit{
    account: Account;
    
    
    constructor(
        private accountService: AccountService
    ){}

    ngOnInit() {

    }
    
}