import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Job } from "src/app/admin/entities/job.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { JobService } from "src/app/admin/services/job.service";

@Component({
    
    templateUrl: './job.list.component.html',
})

export class JobListComponent implements OnInit {
    
    jobs: Job[];
    job: Job;
    keyword: string;
    display: boolean;
    
    constructor(
        private jobService: JobService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.jobService.findAll().then(
            res => {
                this.jobs = res as Job[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.jobService.search(this.keyword).then(
                res => {
                    this.jobs = res as Job[];
                },
                err => {
                    console.log(err);
                });
        }
        this.jobService.search(this.keyword).then(
            res => {
                this.jobs = res as Job[];
            },
            err => {
                console.log(err);
            });
    }

    openNew() {
        this.router.navigate(['/admin/job/add']);
     }

    detail(id: number) {
        this.jobService.setId(id);
        this.router.navigate(['/admin/job/detail']);
    }

    update(id: number) {
        this.jobService.setId(id);
        this.router.navigate(['/admin/job/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this job?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.jobService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.jobService.findAll().then(
                                res => {
                                    this.jobs = res as Job[];
                                    
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