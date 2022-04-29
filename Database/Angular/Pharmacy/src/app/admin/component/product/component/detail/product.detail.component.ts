import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/admin/entities/product.entity";
import { Category } from "src/app/admin/entities/category.entity";
import { ProductFileUpload } from "src/app/admin/entities/productFileUpload.entity";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/admin/services/category.service";
import { ProductService } from "src/app/admin/services/product.service";

@Component({
    
    templateUrl: './product.detail.component.html',

})

export class ProductDetailComponent implements OnInit {
    
    
    id: any;
    product: Product;
    productImages: ProductFileUpload[];    
    category: Category;   

    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {        
            breakpoint: '560px',
            numVisible: 1
        }
        ];


    constructor(
        private productService: ProductService,
        private router: Router,
        private categoryService: CategoryService,
    ){}

    ngOnInit() {
        this.id = this.productService.getId();
        this.productService.find(this.id).then(
            res => {
                this.product = res['product'] as Product;
                this.productImages = res['productImages'] as ProductFileUpload[];
                this.categoryService.find(this.product.categoryId).then(
                    res => {
                        this.category = res as Category;    
                    },
                    err => {
                        console.log(err);    
                    }
                );
                               
            },
            err => {
                console.log(err);
            }
        );        
        

    }

    backToList() {
        this.router.navigate(['/admin/product/list']);
    }

    update(){
        this.productService.setId(this.product.id);
        this.router.navigate(['/admin/product/edit']);
    }
    
}

