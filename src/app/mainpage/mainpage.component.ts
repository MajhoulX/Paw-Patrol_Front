import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [NavbarComponent, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatButtonModule,CommonModule, MatGridListModule,ReactiveFormsModule, FormsModule],
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  animals: any[] = []; // Array to hold the fetched animals
  filteredAnimals: any[] = [];

  filterForm = new FormGroup({
    sex: new FormControl('', [Validators.required]),
    species: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Check if the user is NOT logged in
    if (typeof window !== 'undefined' && !localStorage.getItem('user')) {
      // If NOT logged in, redirect to the login page
      this.router.navigate(['/login']);
    } else {
      // Fetch the animals when the component initializes
      this.fetchAnimals();
    }
  }

  fetchAnimals(): void {
    // Assuming you have an API endpoint that fetches animals
    this.http.get<any[]>('http://localhost:8080/api/animals').subscribe({
      next: (data) => {
        this.animals = data; // Store the fetched animals
        this.filter();
      },
      error: (error) => {
        console.error('Error fetching animals:', error);
        alert('Failed to load animals. Please try again.');
      }
    });
  }

  // Function for adopting an animal (can be expanded)
  adoptAnimal(animal: any): void {
    console.log('Adopted animal:', animal);
    alert(`You have been sent the owners infos to complete adopting ${animal.name} in your email`);
    // Add logic for adopting the animal (e.g., API call)
  }
  
  
  filter(): void {
    // Reset filtered animals to include all animals initially
    this.filteredAnimals = this.animals.filter(animal => {
      let matchesSex = true;
      let matchesLocation = true;
      let matchesSpecies = true;
  
      // Check if the 'sex' filter is provided and matches
      if (this.filterForm.controls.sex.value) {
        matchesSex = animal.sex?.toLowerCase().includes(this.filterForm.controls.sex.value.toLowerCase());
      }
  
      // Check if the 'location' filter is provided and matches
      if (this.filterForm.controls.location.value) {
        matchesLocation = animal.location?.toLowerCase().includes(this.filterForm.controls.location.value.toLowerCase());
      }
  
      // Check if the 'species' filter is provided and matches
      if (this.filterForm.controls.species.value) {
        matchesSpecies = animal.species?.toLowerCase().includes(this.filterForm.controls.species.value.toLowerCase());
      }
  
      // Only include animals that match all non-empty filter criteria
      return (matchesSex && matchesLocation && matchesSpecies);
    });
  
    console.log(this.filteredAnimals);
  }
  
  
  
}
