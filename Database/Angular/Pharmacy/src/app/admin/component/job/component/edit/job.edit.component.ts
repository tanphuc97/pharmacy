import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Job } from "src/app/admin/entities/job.entity";
import { JobService } from "src/app/admin/services/job.service";

@Component({
    
    templateUrl: './job.edit.component.html',
})

export class JobEditComponent implements OnInit {
    
    job: any;

    editJobForm: FormGroup;
    
    display: boolean;
    id: any;


    constructor(
        private jobService: JobService,
        private formbuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit() { 
        this.id = this.jobService.getId();
        this.jobService.find(this.id).then(
            res => {
                this.job = res as Job;
                this.editJobForm = this.formbuilder.group({
                    id: this.job.id,
                    jobName: [this.job.jobName, [Validators.required, Validators.maxLength(250)]],
                    location: [this.job.location, [Validators.required, Validators.maxLength(250)]],
                    description: [this.job.description, [Validators.required]],
                    salary: [this.job.salary, [Validators.required, Validators.maxLength(250)]],
                    status: this.job.status
                });
            },
                err => {
                    console.log(err);
                }
        );
            
    } 

    update(){
        var job: Job = this.editJobForm.value;
        job.created = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

        this.jobService.update(job).then(
            res => {
                console.log(res);                              
                this.display = true;        
                               
            },
            err => {
                console.log(err);
            }
        );
        this.backToList();
        
    }   

    backToList(){
        this.router.navigate(['/admin/job/list']);
    }

    detail() {
        this.jobService.setId(this.job.id);
        this.router.navigate(['/admin/job/detail']);
    }

}