import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Feedback } from "src/app/admin/entities/feedback.entity";
import { FeedbackService } from "src/app/admin/services/feedback.service";

@Component({
    
    templateUrl: './feedback.detail.component.html',

})

export class FeedbackDetailComponent implements OnInit {
    
    id: any;    
    feedback: any;

    constructor(
        private feedbackService: FeedbackService,
        private router: Router,
       
    ){}

    ngOnInit() {
        this.id = this.feedbackService.getId();
        this.feedbackService.find(this.id).then(
            res => {
                this.feedback = res as Feedback;
                console.log(this.feedback);
            },
            err => {
                console.log(err);
            });
    }

    backToList(){
        this.router.navigate(['/admin/feedback/list']);
    }

    update() {
        this.feedbackService.setId(this.feedback.id);
        this.router.navigate(['/admin/feedback/edit']);
    }

}

