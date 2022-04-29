import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, switchMap } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class CartService{
    public cartItemList:any=[]
    public items= new BehaviorSubject<any>([])
    
    constructor(private router : Router){
      
    }

    getProducts(){
        return this.items.asObservable();
    }
    setProduct(item:any){
        this.cartItemList.push(...item);
        this.items.next(item);

    }
    addtoCart(item:any){
        this.cartItemList.push(item);
        this.items.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList)
    }
    getTotalPrice():number{
        let grandTotal = 0;
        this.cartItemList.map((a:any)=>{
            grandTotal += a.total;
        })
        return grandTotal
    }
    removeCartItem(item:any){
     this.cartItemList.map((a:any,index:any)=>{
            if(item.id===a.id){
                this.cartItemList.splice(index,1);
                this.items.next(this.cartItemList);
            }
        })
        this.router.navigate(['/addjob']);
      
    }
    removeAllCart(){
        this.cartItemList=[]
        this.items.next(this.cartItemList);
    }

    
}