import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../components/buttons/primary-button.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { coffeeData } from '../shared/data/coffee-data';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [TopbarComponent, PrimaryButtonComponent, SmallButtonComponent, CommonModule]
})
export class HomePageComponent {
  start: boolean = false
  text: string = "Coffee"
  coffeeProducts = coffeeData;




  // deleteSelectedCoffee(){
  //   this.coffee.
  // }
}
