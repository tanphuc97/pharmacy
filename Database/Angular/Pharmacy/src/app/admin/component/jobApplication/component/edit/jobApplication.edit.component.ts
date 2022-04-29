import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
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
    
    templateUrl: './jobApplication.edit.component.html',
})

export class JobApplicationEditComponent implements OnInit {
    
    jobApplication: any;

    editJobApplicationForm: FormGroup;
    
    display: boolean;
    displayEmail: boolean;
    jobId: any;
    candidateId: any;
    statuses : JobApplicationStatus[];
    job: Job;
    candidate: Candidate;
    candidatePhotos: any;
    candidateCVs: any;
    emailForm: FormGroup;
    
    emailToSend: any;

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
        this.jobApplicationStatusService.findAll().then(
            res => {
                this.statuses = res as JobApplicationStatus[];
                this.jobApplicationService.find(this.jobId, this.candidateId).then(
                    res => {
                        this.jobApplication = res['0'];
                        this.editJobApplicationForm = this.formbuilder.group({
                            jobId: this.jobApplication.jobId,
                            job: this.jobApplication.job,
                            candidateId: this.jobApplication.candidateId,
                            candidate: this.jobApplication.candidate,
                            applyDate: this.jobApplication.applyDate,
                            statusId: this.jobApplication.statusId,
                            dateInterview: this.jobApplication.dateInterview
                        });
                        console.log(this.jobApplication.statusId)
                        this.emailForm = this.formbuilder.group({
                            to: this.jobApplication.email,
                            subject: "",
                            content: ""
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
            },
            err => {

            }
        );
        
            
    }
    
    handleFile(event){
        const formData: FormData = new FormData();

        const files = event.target.files;
        files.foreach(file => {
            formData.append('attachments', file, file.name);
        })

        this.emailForm.patchValue({attachments:formData});
        this.emailForm.updateValueAndValidity();

    }

    update(){
        this.editJobApplicationForm.removeControl('job');
        this.editJobApplicationForm.removeControl('candidate');
        this.editJobApplicationForm.value.dateInterview = formatDate(this.editJobApplicationForm.value.dateInterview, 'dd/MM/yyyy', 'en-US');
        
        var jobApplication: JobApplication = this.editJobApplicationForm.value;
        
        console.log(this.editJobApplicationForm.value);
        this.jobApplicationService.update(jobApplication).then(
            res => {
                console.log(res);                              
                this.display = true;                                
            },
            err => {
                console.log(err);
            }
        );
        
        
    }  
    
    sendEmail(){
        this.emailToSend = this.emailForm.value;
        console.log(this.emailToSend.to);
        this.jobApplicationService.sendemail(this.emailToSend.to).then(
            res => {
                console.log(res);                              
                this.displayEmail = true;                                
            },
            err => {
                console.log(err);
            }
        );
    }

    backToList(){
        this.router.navigate(['/admin/jobapplication/list']);
    }

    detail() {
        this.jobApplicationService.setId(this.jobId, this.candidateId);
        this.router.navigate(['/admin/jobapplication/detail']);
    }

}