import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Category } from "src/app/admin/entities/category.entity";
import { Result } from "src/app/admin/entities/result.entity";
import { CategoryService } from "src/app/admin/services/category.service";

@Component({
    
    templateUrl: './category.list.component.html',
})

export class CategoryListComponent implements OnInit {
    
    categories: Category[];
    category: Category;
    keyword: string;
    display: boolean;
    
    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
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
            this.categoryService.search(this.keyword).then(
                res => {
                    this.categories = res as Category[];
                },
                err => {
                    console.log(err);
                });
        }
        this.categoryService.search(this.keyword).then(
            res => {
                this.categories = res as Category[];
            },
            err => {
                console.log(err);
            });
    }

    openNew() {
       this.router.navigate(['/admin/category/add']);
    }

    update(id: number) {
        this.categoryService.setId(id);
        this.router.navigate(['/admin/category/edit']);
    }

    delete(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this category?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService.delete(id).then(
                    res => {
                        var re: Result = res as Result;
                        if(re.result) {
                            this.categoryService.findAll().then(
                                res => {
                                    this.categories = res as Category[];
                                    
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