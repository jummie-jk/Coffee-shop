import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICoffeeData } from '../shared/interfaces/coffee-page';
import { CommonModule } from '@angular/common';
import { SmallButtonComponent } from '../components/buttons/small-button.component';

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule, SmallButtonComponent
],
})
export class CoffeeDetailsComponent {

  @Input() coffee!: ICoffeeData;
  @Output() buy = new EventEmitter()

  buyCoffeeClicked(coffee: ICoffeeData){
    this.buy.emit()
  }

}
