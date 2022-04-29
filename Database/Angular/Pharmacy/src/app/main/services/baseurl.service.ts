import { Injectable } from "@angular/core";

@Injectable()
//= 'http://localhost:5235/api/'
export class BASE_URLSerVice{
    URL(){
        return 'http://localhost:5235/api/';
    };
    URL_IMG(){
        return 'http://localhost:5235/uploads/'
    }
    URL_Upload(){
        return 'http://localhost:5235/fileuploads/uploads/'
    }
    URLAccount(){
        return this.URL() +'account/';
    };
    URLJobApplication(){
        return this.URL() +'jobapplication/';
    };
    URLCandidate(){
        return this.URL()+ 'candidate/';
    };
    URLFeedback(){
        return this.URL()+'feedback/';
    };
    URLJob (){
        return this.URL()+'job/';
    }
    URLProduct (){
        return this.URL()+'product/';
    }
    URLRole (){
        return this.URL()+'role/';
    }
    URLCategory (){
        return this.URL()+'category/';
    }
    URLInvoice (){
        return this.URL()+'invoice/';
    }
    URLClient (){
        return this.URL()+'client/';
    }
    URLAboutUs(){
        return this.URL()+'aboutus/';
    }
}