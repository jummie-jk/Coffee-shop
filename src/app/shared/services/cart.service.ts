import { Injectable } from '@angular/core';
import { ICoffeeData } from '../interfaces/coffee-page';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: ICoffeeData[] = []

  constructor() { }
  
  add(product: ICoffeeData){
    this.cart.push(product);
    console.log(`product ${product.coffeeName} added to cart`)
  }
}
