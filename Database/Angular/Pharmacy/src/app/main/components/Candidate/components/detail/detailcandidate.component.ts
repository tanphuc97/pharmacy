import { HttpClient } from '@angular/common/http';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';


import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { CandidateService } from 'src/app/main/services/candidate.service';
import { CandidateJob } from 'src/app/main/entitites/candidatejob.entity';
import { Job } from 'src/app/main/entitites/job.entity';
import { Candidate } from 'src/app/main/entitites/candidate.entity';
@Component({
  selector: 'app-root',
  templateUrl: './detailcandidate.component.html',

})
export class DetailCandidateComponent implements OnInit {
  keyword: string;
  candidate: any;
  jobName:any;
  candidatesjob: CandidateJob[]
  job: Job;
  candidates: Candidate[];
  url = 'http://localhost:5235/uploads/';
  file: File;
  constructor(

    private candidateService: CandidateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      var id = parseInt(p.get('id'));
      this.candidateService.find(id).then(
        res => {
          this.candidate = res as Candidate
          console.log(this.candidate.jobName)
        }
      )

    })
  }

  approve(evt: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to REJECT?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var id = evt.target.id;
        console.log(id);
        this.router.navigate(['/admincandidate']);
      }

    })
  }
  

  search(evt: any) {

    this.keyword = evt.target.value
    console.log(this.keyword)
    if (this.keyword != '') {
      this.candidateService.searchbykeyword(this.keyword).then(
        res => {
          this.candidates = res as Candidate[]
        }
      )
    }

    else {
      this.candidateService.findall().then(
        res => {
          this.candidates = res as Candidate[];
        }
      )
    }
  }


}