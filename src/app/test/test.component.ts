import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive, CommonModule,
    
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit() {
    // Access localStorage only when in a browser
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    // Clear the localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }
}
