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
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
