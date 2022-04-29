import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Candidate } from "src/app/admin/entities/candidate.entity";
import { Job } from "src/app/admin/entities/job.entity";
import { JobApplication } from "src/app/admin/entities/jobApplication.entity";
import { JobApplicationStatus } from "src/app/admin/entities/jobApplicationStatus.entity";
import { CandidateService } from "src/app/admin/services/candidate.service";
import { JobService } from "src/app/admin/services/job.service";
import { JobApplicationService } from "src/app/admin/services/jobApplication.service";
import { JobApplicationStatusService } from "src/app/admin/services/jobApplicationStatus.service";

@Component({
    
    templateUrl: './jobApplication.detail.component.html',

})

export class JobApplicationDetailComponent implements OnInit {
    
    jobApplication: any;

    jobApplicationForm: FormGroup;
    
    display: boolean;
    jobId: any;
    candidateId: any;
    statuses : JobApplicationStatus[];
    job: Job;
    candidate: Candidate;
    candidatePhotos: any;
    candidateCVs: any;


    constructor(
        private jobService: JobService,
        private jobApplicationService: JobApplicationService,
        private jobApplicationStatusService: JobApplicationStatusService,
        private candidateService: CandidateService,
        private formbuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit() { 
        this.jobId = this.jobApplicationService.getId1();
        this.candidateId = this.jobApplicationService.getId2();
        this.jobApplicationService.find(this.jobId, this.candidateId).then(
                    res => {
                        this.jobApplication = res['0'] as JobApplication;
                      
                        this.jobApplicationForm = this.formbuilder.group({
                            jobIdJA: this.jobApplication.jobId,
                            jobJA: this.jobApplication.job,
                            candidateIdJA: this.jobApplication.candidateId,
                            candidateJA: this.jobApplication.candidate,
                            applyDateJA: this.jobApplication.applyDate,
                            statusJA: this.jobApplication.status,
                            dateInterviewJA: this.jobApplication.dateInterview
                        });
                        
                        this.jobService.find(this.jobId).then(
                            res => {
                                this.job = res as Job;
                                console.log(this.job)
                            },
                            err => {
                                console.log(err);
                            }
                        );
                        this.candidateService.find(this.candidateId).then(
                            res => {
                                this.candidate = res['candidate'] as Candidate;
                                this.candidatePhotos = res['candidatePhoto'];
                                this.candidateCVs = res['candidateCV'];
                                console.log(this.candidatePhotos)
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    },
                        err => {
                            console.log(err);
                        }
                );
            
    } 

    backToList(){
        this.router.navigate(['/admin/jobapplication/list']);
    }

    update() {
        this.jobApplicationService.setId(this.jobId, this.candidateId);
        this.router.navigate(['/admin/jobapplication/edit']);
    }

}

