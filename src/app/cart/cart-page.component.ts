import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ICoffeeData } from '../shared/interfaces/coffee-page';
import { PaystackOptions } from "angular4-paystack";
import { Angular4PaystackModule } from "angular4-paystack";

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

    getAllCartProducts(){
        this.cartService.getCart().subscribe({
            next: (res) => {
                this.allCartProducts = res;
                console.log("all cart products" , this.allCartProducts)
                this.calculateTotalCartPrice();
                this.calculateTotalCartPrice() 
            },
            error: (err) => {
                console.log("Error getting carts:", err)
            }
        })
    } 
    removeFromCart(id: number){
        console.log("Id:", id);
        this.cartService.removeCart(id).subscribe({
          next: (res) => {
            this.deletedCartItem = res;
            this.getAllCartProducts();
            console.log("deleted item", this.deletedCartItem)
            console.log("Coffee Deleted:", res)
          },
          error: (error) => {
            console.log("Error deleting", error)
          }
        })
      }
       
      calculateTotalCartPrice() {
        this.totalCartPrice = this.allCartProducts.reduce((total: number, cartItem: { coffeePrice: string; }) => {
            const price = parseFloat(cartItem.coffeePrice);
            return total + price;
        }, 0);
        console.log("total price:", this.totalCartPrice)
        this.options.amount = this.totalCartPrice * 100;
    }
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