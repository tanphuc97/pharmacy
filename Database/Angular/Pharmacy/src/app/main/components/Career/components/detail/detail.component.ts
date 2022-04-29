import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Result } from 'src/app/main/entitites/result.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/main/services/job.service';
import { Job } from 'src/app/main/entitites/job.entity';
import { AccountService } from 'src/app/main/services/account.services';
import { CandidateService } from 'src/app/main/services/candidate.service';
import { JobApplicationService } from 'src/app/main/services/jobApplication.service';
import { ConfirmationService } from 'primeng/api';
import { Account } from 'src/app/main/entitites/account.entities';
import { Candidate } from 'src/app/main/entitites/candidate.entity';
import { JobApplication } from 'src/app/main/entitites/jobaplication.entities';

@Component({
  selector: 'app-root',
  templateUrl: './detail.component.html',

})
export class DetailJobComponent implements OnInit {
  jwForm: FormGroup
  display: boolean = false
  title: string
  job: Job;
  url: any;
  date: any
  account: any
  candidate: any
  constructor(
    private formBuilder: FormBuilder,
    private jwService: JobService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private jobService: JobService,

    private accountService: AccountService,
    private confirmationService: ConfirmationService,
    private candidateService: CandidateService,
    private jobApplicationService: JobApplicationService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      var id = parseInt(p.get('id'));
      this.jwService.find(id).then(
        res => {
          this.job = res as Job
        }
      )
    })
  }

  apply(evt: any) {
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
}