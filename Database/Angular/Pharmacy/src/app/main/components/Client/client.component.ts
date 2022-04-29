import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Result } from 'src/app/main/entitites/result.entity';
import { Client } from '../../entitites/client.entity';
import { Feedback } from '../../entitites/feedback.entitty';
import { Invoice } from '../../entitites/invoice.entities';
import { InvoiceDetail } from '../../entitites/invoiceDetail.entities';
import { Product } from '../../entitites/product.entity';
import { ClientService } from '../../services/client.service';
import { FeedbackService } from '../../services/feedback.service';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-root',
    templateUrl: './client.component.html',
    
  })
  export class ClientComponent implements OnInit{
    display:boolean=false;
    today : any
    title:string;
    id: number
    clientForm: FormGroup;
    clientId : any
    product: Product;
   invoice:Invoice;
   invoiceDetail:InvoiceDetail
    constructor(
        private formBuilder : FormBuilder,
        private productService: ProductService,
        private clientService: ClientService,
        private activatedRoute : ActivatedRoute,
        private confirmationService: ConfirmationService,
        private invoiceService : InvoiceService

    ){}
    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(p =>{
            this.id = parseInt(p.get('id'));
            this.productService.findid(this.id).then(
                res=>{
                    this.product = res as Product
                    
                }
            )
        })
        this.clientForm= this.formBuilder.group({
            emailAddress:['',Validators.required],
            name:['',Validators.required],
            city:['',Validators.required],
            address:['',Validators.required],
            country:['',Validators.required],
            phone:['',Validators.required],
            
        })

    }
   
 save(){
     this.today = formatDate(new Date(),'yyyy-MM-dd','en-US')
   
    var client = this.clientForm.value
    this.clientService.create(client).then(
        res=>{
            var re:Result = res as Result
            if(re.result){
                this.clientService.findlastest().then(
                    res=>{
                        var cli = res as Client[]
                        console.log(cli)
                        this.clientId = cli[0].id
                        console.log(this.clientId)
                        this.invoiceService.createnew(this.clientId).then(
                            res=> {
                                var invoiceId:number = res as number
                                if(invoiceId != null){
                                    this.invoiceService.createinvoicedetail(invoiceId,this.id).then(res=>{
                                        var re : Result = res as Result;
                                        if (re.result){
                                           
                                            this.display=true;
                                            this.title='Buy product successfully' ;
                                        }
                                    })

                                }
                            }
                        )
                    }
                )
            }
          
        }

    )
  
  
     
     console.log(client)
    this.clientService.create(client).then(
        res=>{
            var re:Result = res as Result
            if(re.result){

            }
        }

    )

 }

    
}