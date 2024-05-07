import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../components/buttons/primary-button.component';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { coffeeData } from '../shared/data/coffee-data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICoffeeData } from '../shared/interfaces/coffee-page';
import { CoffeeDetailsComponent } from '../coffee-details/coffee-details.component';
import { CartService } from '../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [TopbarComponent, PrimaryButtonComponent, SmallButtonComponent, CommonModule, CoffeeDetailsComponent,]
})
export class HomePageComponent {
  start: boolean = false
  text: string = "Coffee"
  coffeeProducts = coffeeData;
  cart: ICoffeeData[] = [];
  public Editor = ClassicEditor;



  constructor(
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService

  ) {}

  

  addToCart(product: ICoffeeData){
    this.cartService.add(product)

  }
  showSuccess() {
    this.toastr.success('Your coffee has been added,check your to cart!', '');
  }

  



  // deleteSelectedCoffee(){
  //   this.coffee.
  // }
}
