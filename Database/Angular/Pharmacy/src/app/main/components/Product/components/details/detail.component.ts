import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFileUpload } from 'src/app/admin/entities/productFileUpload.entity';
import { Item } from 'src/app/main/entitites/item.entities';
import { Product } from 'src/app/main/entitites/product.entity';
import { BASE_URLSerVice } from 'src/app/main/services/baseurl.service';
import { CartService } from 'src/app/main/services/cart.service';
import { ProductService } from 'src/app/main/services/product.service';


@Component({
  
  templateUrl: './detail.component.html'
  
})
export class DetailProductComponent implements OnInit {
  productIMG: ProductFileUpload[]
  product : Product;
  BASE_IMG_URL: string = this.URL_IMG.URL_IMG();
  url:any
  constructor(
    private productService : ProductService,
    private  activatedRoute : ActivatedRoute,
    private cartService : CartService,
    private router: Router,
    private URL_IMG : BASE_URLSerVice

  ){ }


  ngOnInit(): void {
    console.log('detail');
    this.activatedRoute.paramMap.subscribe(p =>{
      var id = parseInt(p.get('id'));
      this.productService.findid(id).then(
        res => {
          this.product = res['product'] as Product;
          this.productIMG = res['productImages'] as ProductFileUpload[];
          this.url = this.productIMG[0].url
          console.log(this.url)
        },
         err =>{
           console.log(err);
         }
      )
      
    })
  }
  addtocart(evt:any){
    this.productService.findid(evt.target.id).then(
      res=>{
        var producta = res as Product
       var item:Item ={
         product: producta,
         quantity: 1
        };
        this.cartService.addtoCart(item)
      }
    )


}

buynow(evt:any){
  this.router.navigate(['/main/client', { id: evt.target.id }]);
}
  
}

