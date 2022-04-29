import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Candidate } from "src/app/admin/entities/candidate.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { CandidateService } from "src/app/admin/services/candidate.service";
import { RoleService } from "src/app/admin/services/role.service";

@Component({
    
    templateUrl: './candidate.edit.component.html',
})

export class CandidateEditComponent implements OnInit {
    
    id: any;
    editCandidateForm: FormGroup;
    display : boolean = false;
    candidate: any;
    candidateCVs: any;
    candidatePhotos: any;
    
    constructor(
        private candidateService: CandidateService,
        private roleService: RoleService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.candidateService.getId();
        this.candidateService.find(this.id).then(
            res => {
                this.candidate = res['candidate'] as Candidate;
                this.candidateCVs = res['candidateCV'];
                this.candidatePhotos = res['candidatePhoto'];
                this.editCandidateForm = this.formbuilder.group({
                    id: this.candidate.id,
                    fullname: [this.candidate.fullname, [Validators.required, Validators.maxLength(250)]],
                    gender: this.candidate.gender,
                    dob: this.candidate.dob,
                    education: [this.candidate.education, [Validators.required, Validators.maxLength(250)]],
                    address: [this.candidate.address,  [Validators.required, Validators.maxLength(250)]],
                    phone: [this.candidate.phone,  [Validators.required, Validators.maxLength(250)]],
                    status: this.candidate.status
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/candidate/list']);
    }

    detail() {
        this.candidateService.setId(this.candidate.id);
        this.router.navigate(['/admin/candidate/detail']);
    }

    update(){
        this.editCandidateForm.removeControl('account');
        var candidate: Candidate = this.editCandidateForm.value;
        this.candidateService.update(candidate).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

    deleteFile(fileId: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this file?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.candidateService.deleteFile(fileId).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.candidateService.find(this.candidate.id).then(
                                res => {
                                    this.candidateCVs = res['candidateCV'];
                                    
                                },
                                err => {
                                    console.log(err);
                    
                                });
                            
                        } else {
                            console.log('Failed');
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