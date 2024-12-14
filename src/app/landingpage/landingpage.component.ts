import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Ensure this is imported


@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent{
  isLoggedIn = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
