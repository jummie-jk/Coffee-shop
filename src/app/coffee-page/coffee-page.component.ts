import { Component, ViewChild } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';
import { CoffeeServices } from '../shared/services/coffee-page.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SecondaryButtonComponent } from '../components/buttons/secondary-button.component';
import { PrimaryButtonComponent } from '../components/buttons/primary-button.component';
import { OutlinedButtonComponent } from '../components/buttons/outlined-button.component';



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
  successMessage: string = ''
  durationInSeconds = 5
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  @ViewChild('createModal') createModal: any;
  @ViewChild('editModal') editModal: any;  

  constructor(private coffeeServices: CoffeeServices, private fb: FormBuilder, 
    private _snackBar: MatSnackBar, private snackBar: MatSnackBar,
  ){
    this.addCoffeeForm = this.fb.group({
      coffeeName: ['', Validators.required],
      coffeeContent: ['' , Validators.required],
      coffeePrice: ['' , Validators.required],
      coffeeImage: ['../../assets/coffee-a.png'],
    })
  }

  ngOnInit(): void {
    this.getAllCoffee();
    this.alertSnackBar("successful")
    this.alertSnackBar('Your message here');
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
  // TODO
  updateSelectedCoffee(Id: number, data:any){
    this.coffeeServices.updateCoffee(Id, data).subscribe({
      next: (res) => {
        this.deleteCoffee = res;
        console.log("Coffee Updated:", res)

      },
      error: (error) => {
        console.log("Error Updated", error)
      }
    })
  }
// Create a coffee
  AddCoffee(): void {
    if(this.addCoffeeForm.valid){
      const coffeeData = this.addCoffeeForm.value;
      this.coffeeServices.addCoffee(coffeeData).subscribe({
        next: (res) => {
          console.log("CoffeeAdded:", res)
          this.getAllCoffee();
          this.closePopup();
          this.addCoffeeForm.reset();
          this.openSuccessModal();
          this.openSnackBar("Coffee Added Successfully!", "")
        },
        error: (error) => {
          console.log("Error adding coffee:", error)
        }
      })
    }
  } 

  // Modal
  displayCreateModal = "none";
  displayEditModal = "none";
  displaySuccessModal = "none";
  displayDeleteModal = "none";
  openPopup() { 
    this.displayCreateModal = "block"; 
  } 
  closePopup() { 
    this.displayCreateModal = "none"; 
  } 

  openEditPopup() { 
    this.displayEditModal= "block"; 
  } 
  closeEditPopup() { 
    this.displayEditModal = "none"; 
  } 
  openSuccessModal() { 
    this.displaySuccessModal= "block"; 
  } 
  closeSuccessModal() { 
    this.displaySuccessModal = "none"; 
  } 
  openDeleteModal() { 
    this.displayDeleteModal = "block"; 
  } 
  closeDeleteModal() { 
    this.displayDeleteModal  = "none"; 
  } 
  // openEditModal() { 
  //   this.displayEditModal = "block"; 
  // } 
  // closeEditModal() { 
  //   this.displayEditModal  = "none"; 
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  // openSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     horizontalPosition: 'center', // Options: 'start', 'center', 'end'
  //     verticalPosition: 'top', // Options: 'top', 'bottom'
  //   });
  // }
  // alertSnackBar(message: string, horizontalPosition?: string, verticalPosition?:string): void {
  //   let snack = this.snackBar.open(`${message}`, 'Okay', {
  //     horizontalPosition:  'right',
  //     verticalPosition: 'top',
  //     duration: 8000 // Duration in milliseconds (e.g., 8000 milliseconds = 8 seconds)
  //   });
  // }
  alertSnackBar(message: string, horizontalPosition: any = 'right', verticalPosition: any = 'top'): void {
    this.snackBar.open(message, 'Okay', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 8000
    });
  }
  
  
}
