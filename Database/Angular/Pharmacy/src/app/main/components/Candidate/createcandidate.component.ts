import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { Candidate } from '../../entitites/candidate.entity';

import { CandidateService } from '../../services/candidate.service';
import { Result } from '../../entitites/result.entity';

import { JobService } from '../../services/job.service';
import { Job } from '../../entitites/job.entity';
import { AccountService } from '../../services/account.services';
import { Account } from '../../entitites/account.entities';
@Component({
  selector: 'app-root',
  templateUrl: './crcandidate.component.html',

})
export class CreateCandidateComponent implements OnInit {
  title: string;
  display: boolean = false;
  candidateForm: FormGroup;
  job: Job;
  id: any
  candidates: Candidate[];
  account: Account;
  url: any;
  resFile: any
  candi: Candidate[]
  file: File;
  fileCVs: File;
  filePhoto: File;
  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    // private router : Router,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    private router: Router

  ) { }
  // get form(){
  //   return this.candidateForm.controls
  // }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      var id = parseInt(p.get('id'));
      this.accountService.find(id).then(
        res => {
          this.account = res as Account;

        }
      )
    }

    )
    this.candidateForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      education: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      accountId: '',
      phone: ['', [Validators.required]],
      status: false

    })
  }


  selectedFile(evt: any) {
    this.file = evt.target.files[0];
    console.log(this.file);
    if (evt.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  selectedCVFile(evt: any) {
    this.fileCVs = evt.target.files[0];
  }




  save() {
    console.log(this.candidateForm.value.fullname)
    console.log(this.candidateForm.value.dob)
    console.log(this.candidateForm.value.gender)
    console.log(this.candidateForm.value.accountId)
    console.log(this.candidateForm.value.phone)
    console.log(this.candidateForm.value.status)
    //console.log(this.candidateForm.value.dob)
    this.confirmationService.confirm({

      message: 'Do you want to Update your Information?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.candidateForm.value.dob = formatDate(this.candidateForm.value.dob, 'yyyy-MM-dd', 'en-US');
        console.log(this.account.id)
        this.candidateForm.value.accountId = this.account.id
        var candidate: Candidate = this.candidateForm.value;
        console.log(candidate)
        this.candidateService.create(candidate).then(
          res => {

            var re = res as number;
            if (re != null) {
              let photoFormData = new FormData();
        
              photoFormData.append('file', this.filePhoto);
        
              this.candidateService.uploadPhoto(re, photoFormData).then(
                res => {
                  console.log(res);
                  this.candidateService.setId(re);
             
                },
                err => {
                  console.log(err);
                }
              );

              


            }
      
        
          })
      }
    })

 

 

  }

  

}