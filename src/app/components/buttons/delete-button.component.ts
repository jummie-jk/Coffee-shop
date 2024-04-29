import { Component, Input } from '@angular/core';

@Component({
    selector: 'delete-button',
    template: `<button class="small">{{buttonText}}</button>`,
    styles: [`.small {
    border-radius: 24px;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    color: white;
    background-color: red;
    font-size: 12px;
    border: none;
    margin-top: 1rem;
    margin-left: 2rem;
  }
  p {
    font-size: 12px;
    color: white;
  }`],
    standalone: true
})
export class DeleteButtonComponent {
    @Input() buttonText: string = 'Delete'; 
}