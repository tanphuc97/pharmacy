import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { JobApplicationStatus } from "src/app/admin/entities/jobApplicationStatus.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { JobApplicationStatusService } from "src/app/admin/services/jobApplicationStatus.service";

@Component({
    
    templateUrl: './jobApplicationStatus.list.component.html',
})

export class JobApplicationStatusListComponent implements OnInit {
    
    jobApplicationStatuses: JobApplicationStatus[];
    jobApplicationStatus: JobApplicationStatus;
    keyword: string;
    display: boolean;
    
    constructor(
        private jobApplicationStatusService: JobApplicationStatusService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.jobApplicationStatusService.findAll().then(
            res => {
                this.jobApplicationStatuses = res as JobApplicationStatus[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.jobApplicationStatusService.search(this.keyword).then(
                res => {
                    this.jobApplicationStatuses = res as JobApplicationStatus[];
                },
                err => {
                    console.log(err);
                });
        }
        this.jobApplicationStatusService.search(this.keyword).then(
            res => {
                this.jobApplicationStatuses = res as JobApplicationStatus[];
            },
            err => {
                console.log(err);
            });
    }

    openNew() {
       this.router.navigate(['/admin/jobapplicationstatus/add']);
    }

    update(id: number) {
        this.jobApplicationStatusService.setId(id);
        this.router.navigate(['/admin/jobapplicationstatus/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Status?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.jobApplicationStatusService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.jobApplicationStatusService.findAll().then(
                                res => {
                                    this.jobApplicationStatuses = res as JobApplicationStatus[];
                                    
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