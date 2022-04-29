import { Component, OnInit } from "@angular/core";
import { Result } from 'src/app/main/entitites/result.entity';
import { Category } from "../../entitites/category.entity";
import { Item } from "../../entitites/item.entities";
import { Product } from "../../entitites/product.entity";
import { BASE_URLSerVice } from "../../services/baseurl.service";
import { CartService } from "../../services/cart.service";
import { CategoryService } from "../../services/category.Service";
import { ProductService } from "../../services/product.service";
@Component({
    selector: 'app-root',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    products: any;
    urls: string[] = [];
    productsCaro: Product[];
    productstrue: Product[];
    productsfalse: Product[];
    productsPrice:Product[];
    categories: Category[];
    BASE_IMG_URL: string = this.URL_IMG.URL_IMG();
    constructor(
        private productService : ProductService,
        private URL_IMG : BASE_URLSerVice,
        private cartService: CartService,
        private categoryService: CategoryService
   ){}
    
    ngOnInit(): void {
        this.productService.findalltop8().then(
            res=>{
                this.products = res as Product[];
                console.log(this.products[0].url)
            }
            
            )

        this.productService.findalltop3().then(
            res=>{
                this.productsCaro = res as Product[];
               
            }
            
            )    
        this.productService.findallfalse().then(
            res=>{
                this.productsfalse= res as Product[];
            }
        )

        this.productService.findallPricetop8().then(
            res=>{
                this.productsPrice= res as Product[];
            }
        )
    

        this.categoryService.findallTruetop5().then(
            res=>{
                this.categories= res as Category[];
            }
        )

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
    
}