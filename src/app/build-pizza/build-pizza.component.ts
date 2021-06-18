import { Component, OnInit } from '@angular/core';
import { PizzaDbService } from '../pizza-db.service';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.scss']
})
export class BuildPizzaComponent implements OnInit {
ingredients:any;
customs=[];
ch=false;
total=0;

checkedtrue(price,name){
  this.total=this.total+price;
  this.customs.push(name);
}

checkedfalse(price,name){
  if(this.customs[0]!=null){
    this.total=this.total-price;
     for(let i=0;i<this.customs.length;i++){
       if(this.customs[i]===name){
         this.customs.splice(i,1);
       }
     }
  }
}



buildPizza(){
  if(this.total>0)
  {alert("Your Pizza is added to cart . \n Totalcost is "+this.total);
    var ci={image:"https://thumb7.shutterstock.com/display_pic_with_logo/96886/96886,1274350207,7/stock-photo-pizza-53553874.jpg",
             name:"Custom Pizza",price:this.total,ingredients:this.customs}; 
     this.userService.setcart(ci).subscribe((res)=>{
              if(res){
                console.log(" cart message:",res);
              }
              else console.log("Error occured");
           });     
   }
  else alert("Please select ingredient for Pizza.");
}
  constructor(private userService:PizzaDbService) {
   }

  ngOnInit(): void {
   this.userService.getingredient().subscribe((res)=>{
    console.log(res);
    this.ingredients=res;
  },
  (err)=>{
    console.log("something went wrong",err);
  });
  }

}
