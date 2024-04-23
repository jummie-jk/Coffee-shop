import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class CoffeeServices{

    baseUrl: string = "http://localhost:3000"

    constructor(private httpClient: HttpClient) { }

    addCoffee(data: any): Observable<any>{
        return this.httpClient.post(this.baseUrl + 'coffeeProducts' , data)
    }

    // updateCoffee(id: number, data: any){
    //     return this.httpClient.put(this.baseUrl + coffeeProducts / ${id}, data)
    // }

    getCoffee(){
        return this.httpClient.get('http://localhost:3000/coffeeProducts')
    }

    // deleteCoffee(id: number){
    //     return this.httpClient.delete(this.baseUrl + coffeeProducts / ${id})
    // }

    

}