import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Feedback } from "src/app/admin/entities/feedback.entity";
import { FeedbackService } from "src/app/admin/services/feedback.service";

@Component({
    
    templateUrl: './feedback.edit.component.html',
})

export class FeedbackEditComponent implements OnInit {
    
    id: any;
    editFeedbackForm: FormGroup;
    display : boolean = false;
    feedback: any;

    constructor(
        private feedbackService: FeedbackService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.feedbackService.getId();
        this.feedbackService.find(this.id).then(
            res => {
                this.feedback = res as Feedback;
                this.editFeedbackForm = this.formbuilder.group({
                    id: this.feedback.id,
                    title: [this.feedback.title, [Validators.required]],
                    content: [this.feedback.content, [Validators.required]],
                    status: this.feedback.status,
                    client: this.feedback.client,
                    product: this.feedback.product
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/feedback/list']);
    }

    detail() {
        this.feedbackService.setId(this.feedback.id);
        this.router.navigate(['/admin/feedback/detail']);
    }

    update(){
        this.editFeedbackForm.removeControl('client');
        this.editFeedbackForm.removeControl('product');
        var feedback: Feedback = this.editFeedbackForm.value;        
        console.log(feedback);
        this.feedbackService.update(feedback).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}