import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Category } from "src/app/admin/entities/category.entity";
import { CategoryService } from "src/app/admin/services/category.service";

@Component({
    
    templateUrl: './category.add.component.html',
})

export class CategoryAddComponent implements OnInit {
    
    addCategoryForm: FormGroup;
    display : boolean = false;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private formbuilder: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ){}

    ngOnInit() {
        this.addCategoryForm = this.formbuilder.group({
            name: ["", [Validators.required, Validators.maxLength(250)]],
            status: true
        });
        
    }

    backToList(){
        this.router.navigate(['/admin/category/list']);
    }

    create(){
        var category: Category = this.addCategoryForm.value;

        this.categoryService.create(category).then(
            res => {                              
                this.display = true;                       
            },
            err => {
                console.log(err);
            }
        );
    }

}