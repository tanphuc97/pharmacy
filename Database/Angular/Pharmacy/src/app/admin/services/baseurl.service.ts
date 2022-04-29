import { Injectable } from "@angular/core";

@Injectable()
//= 'http://localhost:5235/api/'
export class BASE_URLService{
    URL(){
        return 'http://localhost:5235/api/admin/';
    };
    URLAccount(){
        return this.URL() +'account/';
    };
    URLCategory(){
        return this.URL() +'category/';
    };
    URLCandidate(){
        return this.URL() + 'candidate/';
    };
    URLClient(){
        return this.URL() + 'client/';
    };
    URLFeedback(){
        return this.URL() + 'feedback/';
    };
    URLInvoice(){
        return this.URL() + 'invoice/';
    };
    URLInvoiceDetail(){
        return this.URL() + 'invoicedetail/';
    };
    URLJob(){
        return this.URL() + 'job/';
    }
    URLJobApplication(){
        return this.URL() + 'jobapplication/';
    }
    URLJobApplicationStatus(){
        return this.URL() + 'jobapplicationstatus/';
    }
    URLProduct (){
        return this.URL() + 'product/';
    }
    URLRole (){
        return this.URL() + 'role/';
    }
    URLAboutUs (){
        return this.URL() + 'aboutus/';
    }
}