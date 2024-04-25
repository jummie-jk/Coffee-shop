import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class CoffeeServices{
    baseUrl: string = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }
    // Service to perform CRUD )perations
    updateCoffee(id: number, data: any): Observable<any> {
        const url = `${this.baseUrl}/coffeeProducts/${id}`;
        return this.httpClient.put(url, data);
      }

    getCoffee(){
        return this.httpClient.get(`${this.baseUrl}/coffeeProducts`)
    }

    deleteCoffee(id: number): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/coffeeProducts/${id}`);
    }

    addCoffee(data: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseUrl}/coffeeProducts` , data);
    }


}