import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Category } from "src/app/admin/entities/category.entity";
import { CategoryService } from "src/app/admin/services/category.service";

@Component({
    
    templateUrl: './category.edit.component.html',
})

export class CategoryEditComponent implements OnInit {
    
    id: any;
    editCategoryForm: FormGroup;
    display : boolean = false;
    category: Category;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.id = this.categoryService.getId();
        this.categoryService.find(this.id).then(
            res => {
                this.category = res as Category;
                this.editCategoryForm = this.formbuilder.group({
                    id: this.category.id,
                    name: [this.category.name, [Validators.required, Validators.maxLength(250)]],
                    status: this.category.status
                });
            }
        )        
    }

    backToList(){
        this.router.navigate(['/admin/category/list']);
    }

    update(){
        var category: Category = this.editCategoryForm.value;
        this.categoryService.update(category).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}