import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { JobApplicationStatus } from "src/app/admin/entities/jobApplicationStatus.entity";
import { JobApplicationStatusService } from "src/app/admin/services/jobApplicationStatus.service";

@Component({
    
    templateUrl: './jobApplicationStatus.edit.component.html',
})

export class JobApplicationStatusEditComponent implements OnInit {
    
    id: any;
    editJAStatusForm: FormGroup;
    display : boolean = false;
    jobApplicationStatus: JobApplicationStatus;

    constructor(
        private jobApplicationStatusService: JobApplicationStatusService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.jobApplicationStatusService.getId();
        this.jobApplicationStatusService.find(this.id).then(
            res => {
                this.jobApplicationStatus = res as JobApplicationStatus;
                this.editJAStatusForm = this.formbuilder.group({
                    id: this.jobApplicationStatus.id,
                    name: [this.jobApplicationStatus.name, [Validators.required, Validators.maxLength(250)]],
                    status: this.jobApplicationStatus.status
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/jobapplicationstatus/list']);
    }

    update(){
        var jobApplicationStatus: JobApplicationStatus = this.editJAStatusForm.value;
        this.jobApplicationStatusService.update(jobApplicationStatus).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}