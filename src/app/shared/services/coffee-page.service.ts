import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ICartDetails, ICoffeeData } from "../interfaces/coffee-page";

@Injectable({
    providedIn: 'root',
})

export class CoffeeServices{
    baseUrls: string = 'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/coffeeProducts'
    baseUrl: string = "https://crud-website-q1gk.onrender.com"
    coffeeRef!: AngularFireList<ICoffeeData>;

    constructor(private httpClient: HttpClient) { }
    // Service to perform CRUD )perations
    updateCoffee(id: number, data: any): Observable<any> {
        const url = `${this.baseUrl}/products/update/${id}`;
        return this.httpClient.put(url, data);
      }
      

    getCoffee(){
        return this.httpClient.get(`${this.baseUrl}/products`)
    }

    deleteCoffee(id: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/products/delete/${id}`);
    }

    removeCart(id: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/${id}.json`)
      }

    addCoffee(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/products/create` , data);
    }
    // addToCart(data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.baseUrl}/cartProducts` , data);
    // }

    // addToCart(product: ICartDetails): Observable<any> {
    //     return this.httpClient.post<any>(`${this.baseUrl}/cart/add`, product)
    //   }

      addToCart(product: { productId: string, quantity: number }): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/cart/add`, product);
      }
}