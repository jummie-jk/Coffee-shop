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
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopbarComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    OutlinedButtonComponent,
    SmallButtonComponent,
    CoffeePageComponent,
    DeleteButtonComponent,
    NavbarComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
