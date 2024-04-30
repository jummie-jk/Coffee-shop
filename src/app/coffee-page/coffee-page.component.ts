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
  allCoffee: any;
  deleteCoffee: any;
  Id!: number;
  addCoffeeForm!: FormGroup;
  selectedCoffee: any;
  editForm!: FormGroup;
  currentItem = 'Television';

  @ViewChild('createModal') createModal: any;
  @ViewChild('editModal') editModal: any;  

  constructor(
    private coffeeServices: CoffeeServices,
    private fb: FormBuilder, 
    private toastr: ToastrService

   ){
    this.addCoffeeForm = this.fb.group({
      coffeeName: ['', Validators.required],
      coffeeContent: ['' , Validators.required],
      coffeePrice: ['' , Validators.required],
      coffeeImage: ['../../assets/coffee-a.png'],
    })
    this.editForm = this.fb.group({
      coffeeName: ['', Validators.required],
      coffeeContent: ['' , Validators.required],
      coffeePrice: ['' , Validators.required],
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
  getAllCoffee(){
    this.coffeeServices.getCoffee().subscribe({
      next: (res) => {
        this.allCoffee = res;
        console.log("All coffee data:", this.allCoffee)
      },
      error:(error) => {
        console.log("Error gettingg products:" , error)
        this.showfailed()
      }
    }
    )
  }

// Delete selected coffee by it Id
  deleteSelectedCoffee(Id: number){
    this.coffeeServices.deleteCoffee(Id).subscribe({
      next: (res) => {
        this.deleteCoffee = res;
        console.log("Coffee Deleted: res")
        this.closeDeleteModal();
        this.getAllCoffee();
        this.showDeleted()
      },
      error: (error) => {
        console.log("Error deleting", error)
        this.showfailed()
      }
    })
  }
// When you select the edit button, it should populate the coffee data and make a put request on submit
openEditPopup(coffee: any) {
  this.selectedCoffee = coffee;
  this.displayEditModal = 'block';
  this.editForm.patchValue({
    coffeeName: coffee.coffeeName,
    coffeePrice: coffee.coffeePrice,
    coffeeContent: coffee.coffeeContent
  });
}
onSubmit() {
    if (this.editForm.valid) {
      const editedCoffeeData = this.editForm.value;
      const coffeeId = this.selectedCoffee.id;
      this.coffeeServices.updateCoffee(coffeeId, editedCoffeeData).subscribe({
        next: (data) => {
          console.log('Coffee updated successfully:', data);
          this.getAllCoffee();
          this.closeEditPopup();
          this.showEditSuccess();
          this.editForm.reset();
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
          this.showfailed()
        }
     })
    }
}
// Create a coffee
  AddCoffee(): void {
    if(this.addCoffeeForm.valid){
      const coffeeData = this.addCoffeeForm.value;
      this.coffeeServices.addCoffee(coffeeData).subscribe({
        next: (res) => {
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

}
