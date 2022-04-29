import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/admin/entities/account.entity";
import { Candidate } from "src/app/admin/entities/candidate.entity";
import { AccountService } from "src/app/admin/services/account.service";
import { CandidateService } from "src/app/admin/services/candidate.service";

@Component({
    
    templateUrl: './candidate.detail.component.html',

})

export class CandidateDetailComponent implements OnInit {
    
    id: any;
    editCandidateForm: FormGroup;
    display : boolean = false;
    candidate: any;
    candidateCVs: any;
    candidatePhoto: any;
    account: any;
    
    constructor(
        private candidateService: CandidateService,
        private router: Router,
        private accountService: AccountService
    ){}

    ngOnInit() {
        this.id = this.candidateService.getId();
        this.candidateService.find(this.id).then(
            res => {
                this.candidate = res['candidate'] as Candidate;
                this.candidateCVs = res['candidateCV'];
                this.candidatePhoto = res['candidatePhoto'];
                this.accountService.find(this.candidate.accountId).then(
                    res => {
                        this.account = res as Account;
                    },
                    err => {
                        console.log(err);
                    });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/candidate/list']);
    }

    update() {
        this.candidateService.setId(this.candidate.id);
        this.router.navigate(['/admin/candidate/edit']);
    }

}

