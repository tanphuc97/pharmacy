import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { AboutUsService } from "../../services/aboutus.service";

@Component({
    
    templateUrl: './aboutus.component.html',
})

export class AboutUsComponent implements OnInit {
    
    editAboutUsForm: FormGroup;
    display : boolean = false;
    aboutUs: any;

    constructor(
        private aboutusService: AboutUsService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService

    ){}

    ngOnInit() {
        this.aboutusService.find().then(
            res => {
                this.aboutUs = res;
                console.log(res);
                this.editAboutUsForm = this.formbuilder.group({
                    content: [this.aboutUs.content, [Validators.required]]
                });
            },
            err => {
                console.log(err);
            }
        )
    }

    update(){
        var aboutUs = this.editAboutUsForm.value;        
        console.log(aboutUs);
        this.aboutusService.update(aboutUs).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}