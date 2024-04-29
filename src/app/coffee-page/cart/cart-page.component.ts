import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    standalone: true
})

export class CartComponent {
    @Input() item = ''; 
  
}