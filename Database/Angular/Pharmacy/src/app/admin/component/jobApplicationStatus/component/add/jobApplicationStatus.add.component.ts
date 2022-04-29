import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { JobApplicationStatus } from "src/app/admin/entities/jobApplicationStatus.entity";
import { JobApplicationStatusService } from "src/app/admin/services/jobApplicationStatus.service";

@Component({
    
    templateUrl: './jobApplicationStatus.add.component.html',
})

export class JobApplicationStatusAddComponent implements OnInit {
    
    addJAStatusForm: FormGroup;
    display : boolean = false;

    constructor(
        private jobApplicationStatusService: JobApplicationStatusService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.addJAStatusForm = this.formbuilder.group({
            name: ["", [Validators.required, Validators.maxLength(250)]],
            status: true
        });
        
    }

    backToList(){
        this.router.navigate(['/admin/jobapplicationstatus/list']);
    }

    create(){
        var jobApplicationStatus: JobApplicationStatus = this.addJAStatusForm.value;

        this.jobApplicationStatusService.create(jobApplicationStatus).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}