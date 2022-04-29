import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { Candidate } from 'src/app/main/entitites/candidate.entity';
import { Account } from 'src/app/main/entitites/account.entities';
import { Job } from 'src/app/main/entitites/job.entity';
import { CandidateService } from 'src/app/main/services/candidate.service';
import { JobService } from 'src/app/main/services/job.service';
import { AccountService } from 'src/app/main/services/account.services';
import { Result } from 'src/app/main/entitites/result.entity';


@Component({
  selector: 'app-root',
  templateUrl: './editcandidate.component.html',

})
export class EditCandidateComponent implements OnInit {
  title: string;
  id:number
  display: boolean = false;
  candidateForm: FormGroup;
  job: Job;
  candidates: Candidate[];
  account: Account;
  candidate: Candidate
  url: any;
  file: File;
  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    // private router : Router,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private accountService: AccountService

  ) { }
  // get form(){
  //   return this.candidateForm.controls
  // }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = parseInt(p.get('id'));
    })
      this.candidateService.findUser(this.id).then(
        res => {
          this.candidate = res as Candidate;
          console.log( this.candidate);
          this.candidateForm = this.formBuilder.group({
            id:this.candidate.id,
            fullname: this.candidate.fullname,
            gender: [ this.candidate.gender, [Validators.required]],
            address: [ this.candidate.address, [Validators.required]],
            education: [this.candidate.education, [Validators.required]],
            dob: this.candidate.dob,
            phone: [this.candidate.phone, [Validators.required]],
            status: false
        } )
        
    })

 
    
  
  }
  
  selectedFile(evt: any) {
    this.file = evt.target.files[0];
    console.log('file' + this.file.name);
    this.candidateForm.value.photo = this.file.name
    if (evt.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(evt.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }


  }

  save() {
    console.log(this.candidateForm.value.fullname)
    console.log(this.candidateForm.value.dob)
    console.log(this.candidateForm.value.gender)
    console.log(this.candidateForm.value.phone)
console.log(this.candidateForm.value.status)
//console.log(this.candidateForm.value.dob)
    this.confirmationService.confirm({

      message: 'Do you want to Update your Information?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.candidateForm.value.dob = formatDate(this.candidateForm.value.dob, 'yyyy-MM-dd', 'en-US');

        var candidate: Candidate = this.candidateForm.value;
        console.log(candidate)

        //this.candidateService.saveFile(this.file);
        this.candidateService.update(candidate).then(
          res => {
            
            var re: Result = res as Result;
            console.log(re)
            if (re.result) {
              this.title = 'You can Apply for Our Job now!'
              this.display = true;
            }

          },
          err => {

            console.log(err);
          }
        )
      }
    }
    )
  }
}