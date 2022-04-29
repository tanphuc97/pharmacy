import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Feedback } from "src/app/admin/entities/feedback.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { FeedbackService } from "src/app/admin/services/feedback.service";

@Component({
    
    templateUrl: './feedback.list.component.html',
})

export class FeedbackListComponent implements OnInit {
    
    feedbacks: Feedback[];
    feedback: Feedback;
    keyword: string;
    display: boolean;
    
    constructor(
        private feedbackService: FeedbackService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.feedbackService.findAll().then(
            res => {
                this.feedbacks = res as Feedback[];
            },
            err => {
                console.log(err);
            });
    }

    search(){
        if (this.keyword == ""){
            this.feedbackService.search(this.keyword).then(
                res => {
                    this.feedbacks = res as Feedback[];
                },
                err => {
                    console.log(err);
                });
        }
        this.feedbackService.search(this.keyword).then(
            res => {
                this.feedbacks = res as Feedback[];
            },
            err => {
                console.log(err);
            });
    }

    detail(id: number) {
        this.feedbackService.setId(id);
        this.router.navigate(['/admin/feedback/detail']);
    }

    update(id: number) {
        this.feedbackService.setId(id);
        this.router.navigate(['/admin/feedback/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this feedback?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.feedbackService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.feedbackService.findAll().then(
                                res => {
                                    this.feedbacks = res as Feedback[];
                                    
                                },
                                err => {
                                    console.log(err);
                    
                                });
                            
                        } else {
                            console.log('Failed');
                            this.display = true;
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