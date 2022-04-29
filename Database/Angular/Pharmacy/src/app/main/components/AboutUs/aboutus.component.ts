import { Component, OnInit } from "@angular/core";
import { AboutUsService } from "src/app/admin/services/aboutus.service";

@Component({
    templateUrl: './aboutus.component.html',
})

export class AboutUsComponent implements OnInit {
    aboutus:any
    constructor(
        private aboutUsService: AboutUsService,

      ) { }
    ngOnInit() {
        this.aboutUsService.find().then(res=>{
            this.aboutus=res;
        })
    }
}