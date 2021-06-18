import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaDbService } from '../pizza-db.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cart:any;
total=0;


clearcart(){
  this.userService.clearcart().subscribe((res)=>{
    if(res){
       console.log("cart cleares",res);
       this.cart=[];
       this.total=0;
    }
    else console.log("error occured in clearing!");
    });
}

clearcartitem(name,index,price){
   this.userService.clearcartitem(name).subscribe((res)=>{
    if(res){
      console.log("item deleted",name);
      this.cart.splice(index,1);
       if(this.total-price>=0){
         this.total=this.total-price;
       }
    }
      
   else
     console.log("error occured in clearing!");
   });
}

order(){
    alert("Your pizza is being made.Thanks for ordering");
    this.userService.totalcost=this.total;
    this.router.navigate(['pay']);
}
  constructor(private userService:PizzaDbService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getcart().subscribe((res) => {
      console.log(res);
      this.cart=res;
    },(err)=>{
      console.log("something went wrong",err);
    });

    this.userService.gettotal().subscribe((res)=>{
        if(res){
          console.log("cart items",res);
          this.total=res[0].carttotal;
        }
        else{
          console.log("no items in cart");
          this.total=0;
        }
    });
  }

}
