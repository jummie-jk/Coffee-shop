import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  template: `<button class=>{{buttonText}}</button>`,
  styles: [`.primary {
    
  }
  p {
    font-size: 18px;
    color: blue;
  }`]
})
export class SecondaryButtonComponent {
    @Input() buttonText: string = 'secondary'; 
}