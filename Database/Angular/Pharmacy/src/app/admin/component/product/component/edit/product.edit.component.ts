import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { max } from "src/app/admin/validators/max.validator";
import { Category } from "src/app/admin/entities/category.entity";
import { Product } from "src/app/admin/entities/product.entity";
import { ProductFileUpload } from "src/app/admin/entities/productFileUpload.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { CategoryService } from "src/app/admin/services/category.service";
import { ProductService } from "src/app/admin/services/product.service";

@Component({
    
    templateUrl: './product.edit.component.html',
})

export class ProductEditComponent implements OnInit {
    
    id: any;
    product: Product;
    categories: Category[];
    editProductForm: FormGroup;
    productImages: ProductFileUpload[];
    files: any;
    resFile: any;
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
    display: boolean = false;    

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private formbuilder: FormBuilder,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}
    

    ngOnInit() {
        this.id = this.productService.getId();
        this.productService.find(this.id).then(
            res => {
                this.product = res['product'] as Product;
                this.productImages = res['productImages'] as ProductFileUpload[];
                
                this.categoryService.findAll().then(
                    res => {
                        this.categories = res as Category[];    
                    },
                    err => {
                        console.log(err);    
                    }
                );
                this.editProductForm = this.formbuilder.group({
                    id: this.product.id,
                    name: [this.product.name, [Validators.required, Validators.maxLength(250)]],
            price: [this.product.price, [Validators.required, max(100000000)]],
            description: [this.product.description, [Validators.required]],
                    categoryId: this.product.categoryId,
                    status: this.product.status

                });
            },
            err => {
                console.log(err);
            }
        );
        
    }

    
    update() {
        var product: Product = this.editProductForm.value;
        product.created = this.product.created;
        this.productService.update(product).then(
            res => {
                var re: Result = res as Result;
                if(re.result) {
                    console.log('OK');
                    this.display = true;               
                } else {
                    console.log('Failed');
                }
                
            },
            err => {
                console.log(err);
            }
        );
    }

    backToList(){
        this.router.navigate(['/admin/product/list']);
    }

    selectFile(e: any) {
        this.files = e.target.files;
        console.log(this.files);
    }

    upload(){
        let formData = new FormData();
        for (let file of this.files) {
            formData.append('files', file);
        }
        this.productService.uploadPhoto(this.product.id, formData).then(
            res => {
                console.log(res);
                this.resFile = res;
                this.productService.find(this.product.id).then(
                    res => {                                    
                        this.productImages = res['productImages'] as ProductFileUpload[];
                        console.log(this.productImages);                                    
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

    deletePhoto(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this product?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deletePhoto(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.productService.find(this.product.id).then(
                                res => {                                    
                                    this.productImages = res['productImages'] as ProductFileUpload[];
                                    console.log(this.productImages);                                    
                                },
                                err => {
                                    console.log(err);
                                }
                            );
                            
                        } else {
                            console.log('Failed');
                        }
                        
                    },
                    err => {
                        console.log(err);
                    }
                );
                
            }
        });
    }

    detail(){
        this.productService.setId(this.product.id);
        this.router.navigate(['/admin/product/detail']);
    }
}