import { Component, Input } from '@angular/core';

@Component({
    selector: 'secondary-button',
    template: `<button class="secondary">{{buttonText}}</button>`,
    styles: [`.secondary {
    border-radius: 24px;
    padding: 1rem 1.5rem;
    cursor: pointer;
    color: white;
    background-color: #432010;
    font-size: 16px;
    border: none;
    margin-top: 1rem;
  }
  p {
    font-size: 16px;
    color: white;
  }`],
    standalone: true
})
export class SecondaryButtonComponent {
    @Input() buttonText: string = 'secondary'; 
}