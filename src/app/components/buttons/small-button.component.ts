import { Component, Input } from '@angular/core';

@Component({
    selector: 'small-button',
    template: `<button class="small">{{buttonText}}</button>`,
    styles: [`.small {
    border-radius: 24px;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    color: white;
    background-color: #432010;
    font-size: 12px;
    border: none;
    margin-top: 1rem;
  }
  p {
    font-size: 12px;
    color: white;
  }`],
    standalone: true
})
export class SmallButtonComponent {
    @Input() buttonText: string = 'small'; 
    @Input() disabled?: boolean = true; 
}