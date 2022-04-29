import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/admin/entities/product.entity";
import { ProductService } from "src/app/admin/services/product.service";

@Component({
    
    templateUrl: './product.upload.component.html',
})

export class ProductUploadComponent implements OnInit {
    url: any;
    product: Product;

    files: any;

    resFile: any;

    id: any;

    

    constructor(
        private productService: ProductService,
        private router: Router
    ){}

    ngOnInit() {
        
        
        this.id = this.productService.getId();
        this.productService.find(this.id).then(
            res => {
                this.product = res as Product;
                
                console.log(this.product);

            },
            err => {
                console.log(err);

            }
        );
    } 

    selectFile(evt: any) {
        this.files = evt.target.files;
        console.log(this.files);
        if (evt.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(evt.target.files[0]);
            reader.onload = (event: any) => {
              this.url = event.target.result;
            }
          }
    }

    upload(){
        let formData = new FormData();
        for (let file of this.files) {
            formData.append('files', file);
        }
        this.productService.uploadPhoto(this.id, formData).then(
            res => {
                console.log(res);
                this.resFile = res;
                this.router.navigate(['/admin/product/list']);
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