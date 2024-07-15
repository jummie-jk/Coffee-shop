import { Injectable } from '@angular/core';
import { ICartDetails, ICoffeeData } from '../interfaces/coffee-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: ICoffeeData[] = []
  baseUrl: string = "http://localhost:5000"
  baseUrls: string = 'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts'

  constructor(private httpClient: HttpClient) { }
  
  add(product: ICoffeeData){
    this.cart.push(product);
    this.httpClient.post('https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts.json', product).subscribe(()=> {
      console.log(`product ${product.coffeeName} added to cart`)
    })
  }
  addToCart(product: ICartDetails){
    // this.cart.push(product);
    this.httpClient.post(`${this.baseUrl}/cart/add`, product).subscribe(()=> {
      console.log(`product ${product.productId} added to cart`)
    })
  }


  getCart(){
    return this.httpClient.get(`${this.baseUrl}/cart/`)
  }
  removeCart(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}.json`)
  }
  removeProductFromCart(id: string): Observable<any> {
  return this.httpClient.delete(`https://coffee-shop-86d24.firebaseio.com/cartProducts/${id}`);
  }
  // removeFromCart(id: number): Observable<any> {
  //   return this.httpClient.delete(`${this.baseUrl}/cartProducts/${id}`);
  // }
}
