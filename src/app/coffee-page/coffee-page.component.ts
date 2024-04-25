import { Component, ViewChild } from '@angular/core';
import { coffeeData } from '../shared/data/coffee-data';
import { CoffeeServices } from '../shared/services/coffee-page.services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss'],
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

  @ViewChild('createModal') createModal: any;
  @ViewChild('editModal') editModal: any;  

  constructor(private coffeeServices: CoffeeServices, private fb: FormBuilder){
    this.addCoffeeForm = this.fb.group({
      coffeeName: ['', Validators.required],
      coffeeContent: ['' , Validators.required],
      coffeePrice: ['' , Validators.required],
      coffeeImage: ['../../assets/coffee-a.png'],
    })
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
          this.successMessage = 'Coffee order successfully added!';
          setTimeout(() => {
            this.successMessage = ''; 
          }, 3000); 
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

}
