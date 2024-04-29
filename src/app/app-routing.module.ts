import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeePageComponent } from './coffee-page/coffee-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './coffee-page/cart/cart-page.component';

const routes: Routes = [
  // Adding routes
  {path: "home", component: HomePageComponent, title: "home"},
  {path: "coffee", component: CoffeePageComponent, title: 'coffee'},
  {path: "cart", component: CartComponent, title: 'cart'},
  {path:"", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
