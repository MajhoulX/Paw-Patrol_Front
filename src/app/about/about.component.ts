import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent,MatCardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
