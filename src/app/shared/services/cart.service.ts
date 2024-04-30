import { Injectable } from '@angular/core';
import { ICoffeeData } from '../interfaces/coffee-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: ICoffeeData[] = []
  baseUrl: string = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }
  
  add(product: ICoffeeData){
    this.cart.push(product);
    this.httpClient.post('http://localhost:3000/cartProducts', product).subscribe(()=> {
      console.log(`product ${product.coffeeName} added to cart`)
    })
  }

  getCart(){
    return this.httpClient.get(`${this.baseUrl}/cartProducts`)
  }
  removeCart(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/cartProducts/${id}`);
}
removeFromCart(id: number): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl}/cartProducts/${id}`);
}
}
