import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BackendService } from '../backend.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admindashoard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule,NavbarComponent],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  animals: any[] = [];  // Array to store fetched animals

  constructor(private http: HttpClient, private router: Router) {}

  backend=inject(BackendService);

  ngOnInit(): void {
    this.fetchAnimals();  
  }

  fetchAnimals(): void {
    this.backend.fetchAnimals().subscribe({
      next: (response: any) => {
        this.animals = response; 
      },
      error: (error) => {
        console.error('Error fetching animals:', error);
        alert('Failed to load animals. Please try again later.');
      }
    });
  }

  editAnimal(id: number): void {
    this.router.navigate([`/edit/${id}`]); 
  }

  deleteAnimal(id: number): void {
    const confirmation = confirm('Are you sure you want to delete this animal?');
    if (confirmation) {
      this.http.delete(`http://localhost:8080/api/animals/${id}`).subscribe({
        next: (response: any) => {
          console.log('Animal deleted successfully:', response);
          this.fetchAnimals(); 
        },
        error: (error) => {
          console.error( error);
          alert('There was an error deleting the animal. Please try again.');
        }
      });
    }
  }
  goBack() {
    this.router.navigate(['/add']); 
  }
}
