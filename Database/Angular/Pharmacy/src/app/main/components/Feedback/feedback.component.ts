import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Result } from 'src/app/main/entitites/result.entity';
import { Client } from '../../entitites/client.entity';
import { Feedback } from '../../entitites/feedback.entitty';
import { Product } from '../../entitites/product.entity';
import { ClientService } from '../../services/client.service';
import { FeedbackService } from '../../services/feedback.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-root',
    templateUrl: './feedback.component.html',
    
  })
  export class FeedBackComponent implements OnInit{
      display:boolean=false;
      title:string;

    feedbackForm : FormGroup;
    clientForm:FormGroup;
    sumaryForm: FormGroup;
    client: Client;
    products : Product[];
    feedback: Feedback;
    phonenumber:string;
   
    constructor(
        private formBuilder : FormBuilder,
        private productService: ProductService,
        private clientService: ClientService,
        private feedbackService: FeedbackService,
        private confirmationService: ConfirmationService

    ){}
    ngOnInit() {

        this.sumaryForm= this.formBuilder.group({
            id:[''],
            address:[''],
            title:['',Validators.required],
            emailAddress:[''],
            phone:['',Validators.required],
            content:['',Validators.required],
            productId:['',Validators.required],
        })
        this.feedbackForm = this.formBuilder.group({
            clientId:['',Validators.required],
            content:['',Validators.required],
            title:['',Validators.required],
            productId:['',Validators.required],
        })
    





    }
    confirm(){
        
    }
    showProduct(){
        
        this.clientService.find(this.phonenumber).then(
            res=>{
                this.client = res as Client;
              
                console.log(this.client);
            },
            err=>{
                console.log(err);
            }
        )
        this.productService.showproduct(this.phonenumber).then(
            res=>{
                this.products = res as Product[];
                console.log(this.products)
                
            
            },
            err=>{
                console.log(err);
            }
        )
   
      
    }
    pro(evt: any){
        var productId = evt.target.value;
        console.log('pro'+productId);

    }
    save(){
        this.confirmationService.confirm({
            message: 'Are you sure that you want to SEND?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
      
            this.feedbackForm.value.clientId = this.client.id;
            this.feedbackForm.value.content = this.sumaryForm.value.content;
            this.feedbackForm.value.title = this.sumaryForm.value.title;
            this.feedbackForm.value.productId = this.sumaryForm.value.productId;
            var feedback:Feedback = this.feedbackForm.value
            
            console.log(feedback)
            this.feedbackService.create(feedback).then(
                res=>{
                    var re :Result = res as Result;
                    if(re.result){
                   this.display=true;
                   this.title='Send Feedback Successfully !'
                    }
                    else{
                    console.log('fail');
                    }
                },
                err =>{
                    console.log(err);
                }
            )
            }
  
    })
  }
}