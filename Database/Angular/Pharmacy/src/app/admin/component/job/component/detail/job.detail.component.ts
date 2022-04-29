import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Job } from "src/app/admin/entities/job.entity";
import { JobService } from "src/app/admin/services/job.service";

@Component({
    
    templateUrl: './job.detail.component.html',

})

export class JobDetailComponent implements OnInit {
    
    job: any;

    editJobForm: FormGroup;
    
    id: any;


    constructor(
        private jobService: JobService,
        private router: Router
    ){}

    ngOnInit() { 
        this.id = this.jobService.getId();
        this.jobService.find(this.id).then(
            res => {
                this.job = res as Job;                
            },
                err => {
                    console.log(err);
                }
        );
            
    }

    backToList(){
        this.router.navigate(['/admin/job/list']);
    }

    update() {
        this.jobService.setId(this.job.id);
        this.router.navigate(['/admin/job/edit']);
    }

}

