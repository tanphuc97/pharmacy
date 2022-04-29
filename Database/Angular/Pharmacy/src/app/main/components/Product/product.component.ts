
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { JsonpClientBackend } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { Item } from '../../entitites/item.entities';
import { CartService } from '../../services/cart.service';
import { BASE_URLSerVice } from '../../services/baseurl.service';
import { Product } from '../../entitites/product.entity';
import { ProductSum } from '../../entitites/productsum.entity';
import { ProductFileUpload } from 'src/app/admin/entities/productFileUpload.entity';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',

})
export class ProductComponent implements OnInit {
 display:boolean=false;
 title:string
  keyword: string
   products: any;
  urls: string[] = [];
  rowpage:number;
  productSums : ProductSum[]
  count: number;
  countStatus:number =0;
  id: number;
  item:Item;
  BASE_IMG_URL: string = this.URL_IMG.URL_IMG();
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private URL_IMG : BASE_URLSerVice

  ) { }


  ngOnInit() {
    this.rowpage = 10
   
    this.productService.findall().then(
      res => {
        this.products = res as Product[];
        console.log(this.products[0].url)
            }
          )
       this.products.forEach((a:any)=>{
         Object.assign(a,{quantity:1,total:a.price})
       })
        this.count = this.products.length;
        for(var i=0;i<=this.products.length;i++){
          if(this.products[i].status ==true){
            this.countStatus += 1 
          }
        }

        console.log(this.countStatus)
   
      
  }
     
   
buynow(evt:any){
  this.router.navigate(['/main/client', { id: evt.target.id }]);
}
  

addtocart(evt:any){
  var id= evt.target.id
  this.productService.findid(id).then(
    res=>{
      var producta = res as Product
      var item:Item ={
       product: producta,
       quantity: 1
       
      };
      console.log(item)
    	if(localStorage.getItem('cart') == null) {
        let cart: Item[] = [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      
      } 
      else {
        let cart: Item[] =[];
        cart.push(JSON.parse(localStorage.getItem('cart')));
        console.log(cart)
        // let index: number = -1;
        // for(var i = 0; i < cart.length; i++) {
        // let item: Item = cart[i]
        //   console.log( cart[i])
        //   console.log(item)
        //   if(item.product.id == evt.target.id) {
        //     index = i;
        //     break;
        //   }
        // }
     //   if(index == -1) {
          cart.push(item);
          localStorage.setItem('cart', JSON.stringify(cart));
       // } else
        // {
        //   let item: Item = JSON.parse(cart[index]);
        //   item.quantity += 1;
        //   cart[index] = JSON.stringify(item);
        //   localStorage.setItem("cart", JSON.stringify(cart));
        // }
        }
    }
  )
 
 

}

  detail(evt: any) {
    this.router.navigate(['/main/detailproduct', { id: evt.target.id }]);
  }
  
}