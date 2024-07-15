import { Injectable } from '@angular/core';
import { ICartDetails, ICoffeeData } from '../interfaces/coffee-page';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: ICoffeeData[] = [];
  baseUrl: string = 'https://crud-website-q1gk.onrender.com';
  baseUrls: string =
    'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts';

  constructor(private httpClient: HttpClient) {}

  addToCart(product: ICartDetails) {
    this.httpClient.post(`${this.baseUrl}/cart/add`, product).subscribe(() => {
      console.log(`product ${product.productId} added to cart`);
    });
  }
  removeCart(productId: number): Observable<any> {
    const url = `${this.baseUrl}/cart/remove`;
    return this.httpClient.post(url, { productId });
  }

  getCart() {
    return this.httpClient.get(`${this.baseUrl}/cart/`);
  }

  removeProductFromCart(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://coffee-shop-86d24.firebaseio.com/cartProducts/${id}`
    );
  }
  //
  add(product: ICoffeeData) {
    this.cart.push(product);
    this.httpClient
      .post(
        'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/cartProducts.json',
        product
      )
      .subscribe(() => {
        console.log(`product ${product.coffeeName} added to cart`);
      });
  }
}
