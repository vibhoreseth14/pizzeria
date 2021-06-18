import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'orderpizza', component:OrderPizzaComponent},
  {path:'buildUrPizza',component:BuildPizzaComponent},
  {path:'cart',component:CartComponent},
  {path:'pay',component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
