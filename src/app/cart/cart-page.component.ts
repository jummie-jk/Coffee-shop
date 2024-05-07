import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ICoffeeData } from '../shared/interfaces/coffee-page';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    standalone: true,
    imports: [SmallButtonComponent, CommonModule, NavbarComponent]
})

export class CartComponent implements OnInit {
    @Input() item = ''; 
    allCartProducts: any
    deletedCartItem: any;
    totalCartPrice: number = 0;
    
    constructor(private router: Router, 
        private cartService: CartService
    ){
    }
  
    ngOnInit() {
        this.getAllCartProducts()
    }

    getAllCartProducts(){
        this.cartService.getCart().subscribe({
            next: (res) => {
                this.allCartProducts = res;
                console.log("all cart products" , this.allCartProducts)
                this.calculateTotalCartPrice();
            },
            error: (err) => {
                console.log("Error getting carts:", err)
            }
        })
    } 
    removeFromCart(Id: number){
        this.cartService.removeCart(Id).subscribe({
          next: (res) => {
            this.deletedCartItem = res;
            console.log("Coffee Deleted: res")
           
          },
          error: (error) => {
            console.log("Error deleting", error)
          }
        })
      }
       
      calculateTotalCartPrice() {
        this.totalCartPrice = this.allCartProducts.reduce((total: number, cartItem: { coffeePrice: string; }) => {
            // Convert coffeePrice from string to number
            const price = parseFloat(cartItem.coffeePrice);
            return total + price;
        }, 0);
    }
}