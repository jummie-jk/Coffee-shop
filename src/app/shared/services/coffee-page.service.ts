import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ICoffeeData } from "../interfaces/coffee-page";

@Injectable({
    providedIn: 'root',
})

export class CoffeeServices{
    baseUrl: string = 'https://beanscene-coffeeshop-default-rtdb.firebaseio.com/coffeeProducts.json'
    baseUrls: string = "http://localhost:3000"
    coffeeRef!: AngularFireList<ICoffeeData>;

    constructor(private httpClient: HttpClient) { }
    // Service to perform CRUD )perations
    updateCoffee(id: number, data: any): Observable<any> {
        const url = `${this.baseUrl}/coffeeProducts/${id}`;
        return this.httpClient.put(url, data);
      }

    getCoffee(){
        return this.httpClient.get(`${this.baseUrl}`)
    }

    deleteCoffee(id: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/coffeeProducts/${id}`);
    }

    addCoffee(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}` , data);
    }
    // addToCart(data: any): Observable<any> {
    //     return this.httpClient.post<any>(`${this.baseUrl}/cartProducts` , data);
    // }
}