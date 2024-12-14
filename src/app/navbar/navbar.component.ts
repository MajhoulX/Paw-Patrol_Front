import { CommonModule } from '@angular/common'; // Ensure this is imported
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    const obj = JSON.parse(localStorage.getItem('user') ?? '');
    console.log(obj);

    this.isAdmin = obj.role == 'admin';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }
}
