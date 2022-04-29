import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/admin/entities/product.entity";
import { Category } from "src/app/admin/entities/category.entity";
import { FormGroup } from "@angular/forms";
import { Result } from "src/app/admin/entities/result.entity";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { MessageService } from 'primeng/api';
import { CategoryService } from "src/app/admin/services/category.service";
import { ProductService } from "src/app/admin/services/product.service";


@Component({
    
    templateUrl: './product.list.component.html',

})

export class ProductListComponent implements OnInit {
        
    products: Product[];
    product: Product;
    categories: Category[];
    addProductForm: FormGroup;
    keyword: string;
    display: boolean;


    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
        
    ){}

    ngOnInit() {
        this.productService.findAll().then(
            res => {
                this.products = res as Product[];
                console.log(this.products)
            },
            err => {
                console.log(err);
            });

        this.categoryService.findAll().then(
            res => {
                this.categories = res as Category[];    
            },
            err => {
                console.log(err);    
            });
    }

    search(){
        if (this.keyword == ""){
            this.productService.findAll().then(
                res => {
                    this.products = res as Product[];
                },
                err => {
                    console.log(err);
                });
        }
        this.productService.search(this.keyword).then(
            res => {
                this.products = res as Product[];
            },
            err => {
                console.log(err);
            });
    }

    openNew() {
       this.router.navigate(['/admin/product/add']);
    }

    update(id: number) {
        this.productService.setId(id);
        this.router.navigate(['/admin/product/edit']);
    }

    detail(id: number) {
        this.productService.setId(id);
        this.router.navigate(['/admin/product/detail']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.productService.findAll().then(
                                res => {
                                    this.products = res as Product[];
                                    
                                },
                                err => {
                                    console.log(err);
                    
                                });
                            
                        } else {
                            console.log('Failed');
                            this.display = true;
                        }
                        
                    },
                    err => {
                        console.log(err);
                    }
                );
                
            }
        });
        
        
    }

    

    
}

