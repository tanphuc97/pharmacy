import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Candidate } from "src/app/admin/entities/candidate.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { CandidateService } from "src/app/admin/services/candidate.service";

@Component({
    
    templateUrl: './candidate.list.component.html',
})

export class CandidateListComponent implements OnInit {
    
    candidates: Candidate[];
    candidate: Candidate;
    keyword: string;
    display: boolean;
    
    constructor(
        private candidateService: CandidateService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.candidateService.findAll().then(
            res => {
                this.candidates = res as Candidate[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.candidateService.search(this.keyword).then(
                res => {
                    this.candidates = res as Candidate[];
                },
                err => {
                    console.log(err);
                });
        }
        this.candidateService.search(this.keyword).then(
            res => {
                this.candidates = res as Candidate[];
            },
            err => {
                console.log(err);
            });
    }    

    update(id: number) {
        this.candidateService.setId(id);
        this.router.navigate(['/admin/candidate/edit']);
    }

    detail(id: number) {
        this.candidateService.setId(id);
        this.router.navigate(['/admin/candidate/detail']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Candidate?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.candidateService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.candidateService.findAll().then(
                                res => {
                                    this.candidates = res as Candidate[];
                                    
                                },
                                err => {
                                    console.log(err);
                    
                                });
                            
                        } else {
                            console.log('Failed');
                            this.display = true;
                        }
                        
                    },
                    err => {
                        console.log(err);
                    }
                );
                
            }
        });
        
        
    }

}