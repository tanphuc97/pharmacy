import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Job } from "src/app/admin/entities/job.entity";
import { JobService } from "src/app/admin/services/job.service";

@Component({
    
    templateUrl: './job.add.component.html',
})

export class JobAddComponent implements OnInit {
    
    job: Job;

    addJobForm: FormGroup;
    
    display: boolean;


    constructor(
        private jobService: JobService,
        private formbuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit() {        
                    this.addJobForm = this.formbuilder.group({
                        jobName: ["", [Validators.required, Validators.maxLength(250)]],
                        location: ["", [Validators.required, Validators.maxLength(250)]],
                        description: ["", [Validators.required]],
                        salary: ["", [Validators.required, Validators.maxLength(250)]],
                        status: true
                    });
            
                
        
            
            
    } 

    saveJob(){
        var job: Job = this.addJobForm.value;
        job.created = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

        this.jobService.create(job).then(
            res => {
                console.log(res);                              
                this.display = true;    
                this.router.navigate(['/admin/job/list']);                            
            },
            err => {
                console.log(err);
            }
        );
        
        
    }   

    backToList(){
        this.router.navigate(['/admin/job/list']);
    }

}