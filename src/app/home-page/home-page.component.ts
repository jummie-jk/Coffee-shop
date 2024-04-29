import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../components/buttons/primary-button.component';
import { TopbarComponent } from '../components/topbar/topbar.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [TopbarComponent, PrimaryButtonComponent]
})
export class HomePageComponent {
  start: boolean = false
  text: string = "Coffee"




  // deleteSelectedCoffee(){
  //   this.coffee.
  // }
}
