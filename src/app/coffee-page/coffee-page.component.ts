import { Component, ViewChild } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';
import { CoffeeServices } from '../shared/services/coffee-page.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss'],
  // standalone: true,
  // imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule,],
})
export class CoffeePageComponent {
  coffeeProducts = coffeeData;
  filter: string = '';
  allCoffee: any;
  deleteCoffee: any;
  modalService: any;
  Id!: number;
  addCoffeeForm!: FormGroup;
  selectedCoffee: any;
  editForm!: FormGroup;
  successMessage: string = ''
  durationInSeconds = 200
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  currentItem = 'Television';
  


  @ViewChild('createModal') createModal: any;
  @ViewChild('editModal') editModal: any;  

  constructor(
    private coffeeServices: CoffeeServices,
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private snackBar: MatSnackBar,
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
    this.alertSnackBar("successful");
    this._snackBar.open('test', 'close', { panelClass: 'positioned-snackbar', verticalPosition: 'top'});
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
        this.openDeleteModal();
        this.getAllCoffee();
      },
      error: (error) => {
        console.log("Error deleting", error)
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
          this.editForm.reset();
          this.closeEditPopup()
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
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
          this.openSuccessModal();
          this.alertSnackBar("Coffee Added Successfully!")
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
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
  // Success modal
  openSuccessModal() { 
    this.displaySuccessModal= "block"; 
  } 
  closeSuccessModal() { 
    this.displaySuccessModal = "none"; 
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

// Alert: Not working as espected: TODO
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  
  alertSnackBar(message: string, horizontalPosition: any = 'right', verticalPosition: any = 'top'): void {
    this.snackBar.open(message, 'Okay', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 200000
    });
  }

// addToCart(product: any) {
//   this.coffeeServices.addToCart(product).subscribe({
//     next: (res) => {
//       console.log('Product added to cart', res);
//     },
//     error: (err) => {
//       console.log('Error adding to cart', err);
//     }
//   });
// }


  addToCart(coffeeId: number) {
   console.log("coffeeId", coffeeId)
  }
}
