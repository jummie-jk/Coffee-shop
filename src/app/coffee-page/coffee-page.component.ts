import { Component } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';
import { CoffeeServices } from '../shared/services/coffee-page.services';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss']
})
export class CoffeePageComponent {
  coffeeProducts = coffeeData;
  filter: string = '';
  allCoffee: any;

  constructor(private coffeeServices: CoffeeServices){}

  // ngOninIt(): void{
  //   this.getAllCoffee()
  // }
  ngOnInit(): void {
    this.getAllCoffee();

  }

// Filter products based on the product name
// If filter is empty display all the products if not display items with the filtered name
  getfilterProducts(){
    return this.filter === '' ? this.coffeeProducts
    :this.coffeeProducts.filter((product) => product.coffeeName === this.filter)
  
  }

  getAllCoffee(){
    this.coffeeServices.getCoffee().subscribe({
      next: (res) => {
        this.allCoffee = res;
        console.log("All coffee data:", this.allCoffee)
      },
      error:(error) => {
        console.log("Error gettingg products:" , error)
      }
    }
    )
  }

  

}
