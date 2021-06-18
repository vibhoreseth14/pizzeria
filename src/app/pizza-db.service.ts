import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaDbService {
  totalcost=0;
  constructor(private http:HttpClient) { }

  getPizza(){
    return this.http.get("http://localhost:3000/displaypizza");
  }
  getingredient(){
    return this.http.get('http://localhost:3000/displayingredients');
  }
  getcart(){
    return this.http.get('http://localhost:3000/displaycart');
  }
  setcart(item:any){
    return this.http.post('http://localhost:3000/addtocart',item);
  }

  clearcart(){
    return this.http.get('http://localhost:3000/clearcart');
  }

  clearcartitem(n){
    return this.http.post('http://localhost:3000/clearcartitem',{name:n});
  }

  gettotal(){
    return this.http.get('http://localhost:3000/gettotal');
  }

}
