import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PrimaryButtonComponent } from './components/buttons/primary-button.component';
import { SecondaryButtonComponent } from './components/buttons/secondary-button.component';
import { CoffeePageComponent } from './coffee-page/coffee-page.component';
import { OutlinedButtonComponent } from './components/buttons/outlined-button.component';
import { SmallButtonComponent } from './components/buttons/small-button.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteButtonComponent } from './components/buttons/delete-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopbarComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    OutlinedButtonComponent,
    SmallButtonComponent,
    DeleteButtonComponent,
    NavbarComponent,
    CoffeePageComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
     MatFormFieldModule, 
     FormsModule, 
     MatInputModule, 
     MatButtonModule,
     MatSnackBarModule,
     BrowserAnimationsModule,
     MatSnackBarModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
