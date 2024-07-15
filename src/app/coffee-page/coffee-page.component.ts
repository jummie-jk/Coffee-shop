import { Component, ViewChild } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';
import { CoffeeServices } from '../shared/services/coffee-page.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf, NgFor, NgStyle } from '@angular/common';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { CartComponent } from '../cart/cart-page.component';
import { DeleteButtonComponent } from '../components/buttons/delete-button.component';
import { SmallButtonComponent } from '../components/buttons/small-button.component';
import { OutlinedButtonComponent } from '../components/buttons/outlined-button.component';
import { SecondaryButtonComponent } from '../components/buttons/secondary-button.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ICartDetails } from '../shared/interfaces/coffee-page';

@Component({
    selector: 'app-coffee-page',
    templateUrl: './coffee-page.component.html',
    styleUrls: ['./coffee-page.component.scss'],
    standalone: true,
    providers: [MessageService],
    imports: [
        NavbarComponent,
        SecondaryButtonComponent,
        OutlinedButtonComponent,
        SmallButtonComponent,
        DeleteButtonComponent,
        ReactiveFormsModule,
        CartComponent,
        CommonModule,
        FormsModule,
    ],
})
export class CoffeePageComponent {
  coffeeProducts = coffeeData;
  filter: string = '';
  allCoffee: any[] = [];
  deleteCoffee: any;
  selectedCoffee: any;
  Id!: number;
  cartDetails!: {
    productId: string;
    quantity: number;
  };
  addCoffeeForm!: FormGroup;
  editForm!: FormGroup;
  currentItem = 'Television';
  coffeeImages: string[] = [
    '../../assets/coffee-a.png',
    '../../assets/coffee-b.png',
    '../../assets/coffee-c.png'
    // Add more image paths as needed
  ];

  @ViewChild('createModal') createModal: any;
  @ViewChild('editModal') editModal: any;  

  constructor(
    private coffeeServices: CoffeeServices,
    private fb: FormBuilder, 
    private toastr: ToastrService

   ){
    this.addCoffeeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['' , Validators.required],
      price: ['' , Validators.required],
      coffeeImage: ['../../assets/coffee-a.png'],
    })
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['' , Validators.required],
      price: ['' , Validators.required],
      coffeeImage: ['../../assets/coffee-a.png'],
    });
  }

  ngOnInit(): void {
    this.getAllCoffee();
  }


// Filter products based on the product name
// If filter is empty display all the products if not display items with the filtered name
  getfilterProducts(){
    return this.filter === '' ? this.coffeeProducts
    :this.coffeeProducts.filter((product) => product.coffeeName === this.filter)
  }

// Get all coffee
  getAllCoffee() {
    this.coffeeServices.getCoffee().subscribe({
      next: (res: any) => {
        this.allCoffee = res.data;
        console.log("All coffee data:", this.allCoffee);
      },
      error: (error) => {
        console.log("Error getting products:", error);
        this.showfailed();
      }
    });
  }
  

// Delete selected coffee by it Id
  deleteSelectedCoffee(Id: number){

    this.coffeeServices.deleteCoffee(Id).subscribe({
      next: (res) => {
        this.deleteCoffee = res;
        console.log("Coffee Deleted:", this.deleteCoffee)
        this.closeDeleteModal();
        this.getAllCoffee();
        this.showDeleted()
      },
      error: (error) => {
        console.log("Error deleting", error);
         console.log(Id)
        this.showfailed()
      }
    })
  }
// When you select the edit button, it should populate the coffee data and make a PUT request on submit
openEditPopup(coffee: any) {
  this.selectedCoffee = coffee;
  this.displayEditModal = 'block';
  this.editForm.patchValue({
    name: coffee.name,
    price: coffee.price,
    description: coffee.description
  });
}
// Submit the new details edited
onSubmit() {
    if (this.editForm.valid) {
      const editedCoffeeData = this.editForm.value;
      const coffeeId = this.selectedCoffee._id;
      this.coffeeServices.updateCoffee(coffeeId, editedCoffeeData).subscribe({
        next: (data) => {
          console.log('Coffee updated successfully:', data);
          // Id sucessful, get all products, close the modal, reset the form and show a success notification
          this.getAllCoffee();
          this.closeEditPopup();
          this.showEditSuccess();
          this.editForm.reset();
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
          this.showfailed();
          this.closeEditPopup();
        }
     })
    }
}
// Create a coffee
  AddCoffee(): void {
    if(this.addCoffeeForm.valid){
      const coffeeData = this.addCoffeeForm.value;
      console.log("data", coffeeData);
      this.coffeeServices.addCoffee(coffeeData).subscribe({
        next: (res: any[]) => {
          // this.allCoffee = res;
          this.allCoffee = Object.values(res);
          // When you add a new coffee, get all the coffee and close the modal. Also, reset the form and show a status notifications
          this.getAllCoffee();
          this.closePopup();
          this.addCoffeeForm.reset();
          this.showSuccess()
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
          this.showfailed()
        }
      })
    }
  } 
  // addToCart(productId: string, quantity: number) {
  //   const product = this.cartDetails;
  //   console.log("cart details", this.cartDetails)
  //   this.coffeeServices.addToCart(product).subscribe(
  //     () => {
  //       console.log(`Product ${product.productId} added to cart`);
  //     },
  //     error => {
  //       console.error('Error adding product to cart:', error);
  //     }
  //   );
  // }
  addToCart(productId: string, quantity = 1) {
    const product = {
      productId: productId,
      quantity: quantity
    };
  
    console.log("Adding to cart:", product);
  
    this.coffeeServices.addToCart(product).subscribe(
      () => {
        console.log(`Product ${productId} with quantity ${quantity} added to cart`);
      },
      error => {
        if (error.error.message === "Product already in cart") {
          this.toastr.error('Product already in cart!', '');
        }
        console.error('Error adding product to cart:', error);
      }
    );
  }
 
  // Modals
  displayCreateModal = "none";
  displayEditModal = "none";
  displaySuccessModal = "none";
  displayDeleteModal = "none";
  // Create Modal
  openPopup() { 
    this.displayCreateModal = "block"; 
  } 
  closePopup() { 
    this.displayCreateModal = "none"; 
  } 
  // Modal for delete
  openDeleteModal() { 
    this.displayDeleteModal = "block"; 
  } 
  closeDeleteModal() { 
    this.displayDeleteModal  = "none"; 
  } 
  // Modal for edit
  closeEditPopup() { 
    this.displayEditModal = "none"; 
  } 
  showSuccess() {
    this.toastr.success('Congratulations, your coffee order was added sucessfully!', '');
  }
  showEditSuccess() {
    this.toastr.success('Congratulations, your changes has been added', '');
  }
  showfailed() {
    this.toastr.error('Failed, please try again!', '');
  }
  showDeleted() {
    this.toastr.warning('Coffee has been deleted!', '');
  }
  // addToCart(product: ICartDetails){
  //   // this.cart.push(product);
  //   this.httpClient.post(`${this.baseUrl}/cart/add`, product).subscribe(()=> {
  //     console.log(`product ${product.productId} added to cart`)
  //   })
  // }
 

}
