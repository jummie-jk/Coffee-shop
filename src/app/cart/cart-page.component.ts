import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ICoffeeData } from '../shared/interfaces/coffee-page';
import { PaystackOptions } from "angular4-paystack";
import { Angular4PaystackModule } from "angular4-paystack";
import { coffeeData } from '../shared/data/coffee-data';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    standalone: true,
    imports: [SmallButtonComponent, CommonModule, NavbarComponent, Angular4PaystackModule]
})

export class CartComponent implements OnInit {
    @Input() item = ''; 
    allCartProducts: any
    deletedCartItem: any;
    totalCartPrice: number = 0;
    bagDetail: any;
    price!: number;
    show: boolean = false;
    message!: string;
    reference: string = "";
    productQuantity: number = 1
    coffeeData = coffeeData;

    options: PaystackOptions = {
        amount: 0,
        email: "jummiejk21@gmail.com",
        ref: `${Math.ceil(Math.random() * 10e10)}`,
        channels: ["USSD", "bank", "card"],
        // quantity: 1,
        currency: "NGN",
      };
    
    constructor(private router: Router, 
        private cartService: CartService
    ){
    }
  
    ngOnInit() {
        this.getAllCartProducts()
    }
// Get all products from cart
    getAllCartProducts(){
        this.cartService.getCart().subscribe({
            next: (res : any) => {
              console.log("All cart productsss", res)
              if (res && typeof res === 'object'){
                this.allCartProducts = Object.values(res);
                console.log("all cart products" , this.allCartProducts)
                this.calculateTotalCartPrice();
                this.calculateTotalCartPrice() 
              }
               else{
                console.error("Response is not an object:", res);
               } 
            },
            error: (err) => {
                console.log("Error getting carts:", err)
            }
        })
    } 

// Remove product from cart
removeFromCart(id: number){
  console.log("Id:", id);
  this.cartService.removeCart(id).subscribe({
    next: (res) => {
      if (res === null) {
        console.log("Item deleted successfully.");
        this.getAllCartProducts(); // Refresh the list of cart products after deletion
      } else {
        console.log("Unexpected response from server:", res);
      }
    },
    error: (error) => {
      console.log("Error deleting", error);
    }
  });
}


      // Calculate the total cart price, convert it to a number
      calculateTotalCartPrice() {
        this.totalCartPrice = this.allCartProducts.reduce((total: number, cartItem: { coffeePrice: string; coffeeQuantity: number }) => {
            const price = parseFloat(cartItem.coffeePrice);
            return total + (price * cartItem.coffeeQuantity);
        }, 0);
        console.log("total price:", this.totalCartPrice)
        this.options.amount = this.totalCartPrice * 100;
      }
      // Increase and decrease quantity
      decreaseQuantity(cart: any) {
        if (cart.coffeeQuantity > 1) {
          cart.coffeeQuantity--;
          this.calculateTotalCartPrice();
        }
      }
      increaseQuantity(cart: any) {
        cart.coffeeQuantity++;
        this.calculateTotalCartPrice()
      }
      // Paystack Integration
      paymentInit() {
            console.log("Payment is Initialized");
      }
    
      paymentSuccess(ref: any) {
        this.message = "Payment is successful";
        console.log(this.message, ref);
      }
    
      paymentFailed() {
        console.log("Payment Failed");
      }
}