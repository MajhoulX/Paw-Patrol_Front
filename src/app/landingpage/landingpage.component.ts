import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent implements OnInit {
  http = inject(HttpClient);
  ngOnInit(): void {
    const baseUrl = "http://localhost:8080/login";
    this.http.get<string>(baseUrl + "?size=tiny")
      .subscribe({
        next: (value) => {
          this.header = value;
          console.log(value);
        }
      });
  }
  header: string = 'Adopt';
}
