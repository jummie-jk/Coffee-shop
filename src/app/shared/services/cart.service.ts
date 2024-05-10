import { Injectable } from '@angular/core';
import { ICoffeeData } from '../interfaces/coffee-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: ICoffeeData[] = []
  // baseUrl: string = "http://localhost:3000"
  baseUrl: string = 'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts.json'

  constructor(private httpClient: HttpClient) { }
  
  add(product: ICoffeeData){
    this.cart.push(product);
    this.httpClient.post('https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts.json', product).subscribe(()=> {
      console.log(`product ${product.coffeeName} added to cart`)
    })
  }

  getCart(){
    return this.httpClient.get(`${this.baseUrl}`)
  }
  removeCart(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
}
  // removeFromCart(id: number): Observable<any> {
  //   return this.httpClient.delete(`${this.baseUrl}/cartProducts/${id}`);
  // }
}
