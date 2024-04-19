import { Component } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss']
})
export class CoffeePageComponent {
  coffeeProducts = coffeeData;
  filter: string = '';

// Filter products based on the product name
// If filter is empty display all the products if not display items with the filtered name
  getfilterProducts(){
    return this.filter === '' ? this.coffeeProducts
    :this.coffeeProducts.filter((product) => product.coffeeName === this.filter)
  }

}
