import { Component, Input } from '@angular/core';

@Component({
    selector: 'outlined-button',
    template: `<button class="outlined">{{buttonText}}</button>`,
    styles: [`.outlined {
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    color: black;
    background-color: white;
    border: 2px solid #432010;
    font-size: 16px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: white;
  }
  @media (max-width: 600px) {
        .small {
            font-size: 10px;
            padding: 0.1rem 0.3rem; 
            border-radius: 7px;
        }
    }`],
    standalone: true
})
export class OutlinedButtonComponent {
    @Input() buttonText: string = 'outlined'; 
}