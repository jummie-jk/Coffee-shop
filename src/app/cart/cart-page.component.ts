import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    standalone: true
})

export class CartComponent implements OnInit {
    @Input() item = ''; 
    
   
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    }
  
    ngOnInit() {
  
      
    }
  
    
}