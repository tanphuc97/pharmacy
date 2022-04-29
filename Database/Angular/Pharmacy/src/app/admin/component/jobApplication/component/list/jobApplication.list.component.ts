import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JobApplication } from "src/app/admin/entities/jobApplication.entity";
import { JobApplicationService } from "src/app/admin/services/jobApplication.service";

@Component({
    
    templateUrl: './jobApplication.list.component.html',
})

export class JobApplicationListComponent implements OnInit {
    
    jobApplications: JobApplication[];
    jobApplication: JobApplication;
    keyword: string;
    jobId:any;
    candidateId:any
    constructor(
        private jobApplicationService: JobApplicationService,
        private router: Router
    ){}

    ngOnInit() {
        this.jobApplicationService.findAll().then(
            res => {
                this.jobApplications = res as JobApplication[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.jobApplicationService.search(this.keyword).then(
                res => {
                    this.jobApplications = res as JobApplication[];
                },
                err => {
                    console.log(err);
                });
        }
        this.jobApplicationService.search(this.keyword).then(
            res => {
                this.jobApplications = res as JobApplication[];
            },
            err => {
                console.log(err);
            });
    }
    
    detail(jobId: number, candidateId: number) {
        this.jobApplicationService.setId(jobId, candidateId);
        this.router.navigate(['/admin/jobapplication/detail']);
    }

    backToList(){
        this.router.navigate(['/admin/jobapplication/list']);
    }
    update(jobId: number, candidateId: number) {
      
        this.jobApplicationService.setId(jobId, candidateId);
        this.router.navigate(['/admin/jobapplication/edit']);
    }
}