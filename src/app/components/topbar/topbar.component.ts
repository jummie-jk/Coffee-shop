import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class TopbarComponent {

  constructor(private router: Router){

  }
  
}
