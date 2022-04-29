import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Category } from "src/app/admin/entities/category.entity";
import { Product } from "src/app/admin/entities/product.entity";
import { formatDate } from '@angular/common';
import { min } from "src/app/admin/validators/min.validator";
import { max } from "src/app/admin/validators/max.validator";
import { CategoryService } from "src/app/admin/services/category.service";
import { ProductService } from "src/app/admin/services/product.service";

@Component({
    
    templateUrl: './product.add.component.html',
})

export class ProductAddComponent implements OnInit {

    product: Product;

    categories: Category[];

    addProductForm: FormGroup;

    files: any;

    resFile: any;

    resId : any;


    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private formbuilder: FormBuilder,
        private router: Router
    ){}

    ngOnInit() {

        this.categoryService.findAll().then(
            res => {
                this.categories = res as Category[];
                this.addProductForm = this.formbuilder.group({
                    name: ["", [Validators.required, Validators.maxLength(250)]],
                    price: [0, [Validators.required, max(100000000)]],
                    description: ["", [Validators.required]],
                    categoryId: 1,
                    status: true
                });
            },
            err => {
                console.log(err);
    
            }
        );
                
        
            
            
    } 

    saveProduct(){
        var product: Product = this.addProductForm.value;
        product.created = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

        this.productService.create(product).then(
            res => {                              
                this.resId = res as number;
                this.productService.setId(this.resId.result);
                if (this.resId != null){
                    this.router.navigate(['/admin/product/upload']);
                };                                
            },
            err => {
                console.log(err);
            }
        );
        
        
    }   

    backToList(){
        this.router.navigate(['/admin/product/list']);
    }

}