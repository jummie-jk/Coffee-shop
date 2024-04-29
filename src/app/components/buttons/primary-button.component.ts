import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-primary-button',
    template: `<button class="primary">{{ buttonText }}</button>`,
    styles: [`.primary{
    width: 134px;
    height: 48px;
    border-radius: 24px;
    cursor: pointer;
    color: black;
    background-color: #F9C06A;
    font-size: 18px;
    border: none;
  }
  p {
    font-size: 18px;
    color: blue;
  }`],
    standalone: true
})
export class PrimaryButtonComponent {
    @Input() buttonText: string = 'primary'; 
}
