import { Component, OnInit } from '@angular/core';
import { PizzaDbService } from '../pizza-db.service';

@Component({
  selector: 'app-order-pizza',
  templateUrl: './order-pizza.component.html',
  styleUrls: ['./order-pizza.component.scss']
})
export class OrderPizzaComponent implements OnInit {
  pizzas:any;
  constructor(private userService:PizzaDbService) { }

  addtocart(pizza){
    var ci={image:pizza.image,name:pizza.name,price:pizza.price,ingredients:pizza.ingredients};
    this.userService.setcart(ci).subscribe((res)=>{
       if(res){
         console.log(" cart message:",res);
       }
       else console.log("Error occured");
    });
     alert(pizza.name+" added to cart!");
  }
  ngOnInit(): void {
     this.userService.getPizza().subscribe((res)=>{
       console.log(res);
       this.pizzas=res;
     },
     (err)=>{
       console.log("something went wrong",err);
     });
  }

}
