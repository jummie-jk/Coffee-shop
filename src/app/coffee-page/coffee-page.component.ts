import { Component } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss']
})
export class CoffeePageComponent {
  coffeeProducts = coffeeData;
  

}
