import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { Result } from '../../entitites/result.entity';
import { JobService } from '../../services/job.service';
import { Job } from '../../entitites/job.entity';
import { AccountService } from '../../services/account.services';
import { Account } from '../../entitites/account.entities';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../entitites/candidate.entity';
import { JobApplicationService } from '../../services/jobApplication.service';
import { JobApplication } from '../../entitites/jobaplication.entities';

@Component({
  selector: 'app-root',
  templateUrl: './job.component.html',

})
export class JobComponent implements OnInit {
  display: boolean = false;
  jobApp: JobApplication
  title: string
  account: any
  candidate: any
  keyword: string
  jobForm: FormGroup
  jobs: Job[];
  job: Job;
  url: any;
  location: string;
  jobName: string;
  count: number;
  countStatus: number = 0;
  id: number;
  items: number;
  date: any
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private candidateService: CandidateService,
    private jobApplicationService: JobApplicationService
  ) { }


  ngOnInit() {

    this.items = 10

    this.jobService.findall().then(
      res => {
        this.jobs = res as Job[];
        console.log(this.jobs)
        this.count = this.jobs.length;
        for (var i = 0; i <= this.jobs.length; i++) {
          if (this.jobs[i].status == true) {
            this.countStatus += 1
          }
        }
        console.log(this.countStatus)

        console.log(this.count);
      }
    )

    this.jobForm = this.formBuilder.group({
      jobName: ['', [Validators.required]],
      location: ['', [Validators.required]],
      keyword: ''
    });

  }

  detail(evt: any) {

    this.router.navigate(['/main/jobdetail', { id: evt.target.id }]);
  }
  applynow(evt: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Apply?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        var id: number = evt.target.id
        console.log(this.date)
        var username = localStorage.getItem('username');
        if (username != null) {
          this.accountService.findUser(username).then(
            res => {
              this.account = res as Account;
              this.candidateService.findUser(this.account.id).then(
                res => {
                  this.candidate = res as Candidate;
                  console.log(this.candidate)
                  this.jobApplicationService.findByCandiateId(this.candidate.id).then(
                    res => {
                      var jobapps = res as JobApplication[]
                      console.log(jobapps);
                      for (var i = 0; i < jobapps.length; i++) {
                        if (jobapps[i].statusId == 3) {
                          this.display = true
                          this.title = ' Fail to Apply  !'
                          this.router.navigate(['/main/career']);
                        }
                      }
                      var job: JobApplication = {
                        jobId: id,
                        candidateId: this.candidate.id,
                        applyDate: this.date,
                        statusId: 1,
                        dateInterview: null
                      }
                      this.jobApplicationService.create(job).then(
                        res => {
                          var re: Result = res as Result;
                          if (re.result) {
                            this.display = true
                            this.title = ' Application Form !'
                          }
                        })
                    }
                  )

                }
              )

            },
            err => {
              console.log(err);
            }
          )

        }
      }
    })
  }
  search(evt: any) {
    this.keyword = evt.target.value;
    console.log(this.keyword)
    this.jobService.searchbykeyword(this.keyword).then(
      res => {
        this.jobs = res as Job[]
      }
    )
  }

 
}