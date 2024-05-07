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
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart-page.component';
import { MessageService } from 'primeng/api';
import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';






@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        HomePageComponent,
        TopbarComponent,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        OutlinedButtonComponent,
        SmallButtonComponent,
        DeleteButtonComponent,
        NavbarComponent,
        CoffeePageComponent,
        CartComponent,
    
        
        
    ],
    providers: [
      provideAnimations(), // required animations providers
      provideToastr(), // Toastr providers
    ],
    bootstrap: [AppComponent],
    
})
export class AppModule { }
