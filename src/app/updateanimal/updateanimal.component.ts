import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { tap } from 'rxjs';
import { Console } from 'console';

@Component({
  selector: 'app-update-animal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './updateanimal.component.html',
  styleUrls: ['./updateanimal.component.scss']
})
export class UpdateAnimalComponent implements OnInit {
  editAnimalForm: FormGroup;
  animalId: number=0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editAnimalForm = this.fb.group({
      name: ['', [Validators.required]],
      species: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      sex: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      picture: ['']  // Picture is optional on edit, will handle file upload separately
    });
  }

  ngOnInit(): void {
    this.animalId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchAnimalDetails(this.animalId);
  }

  fetchAnimalDetails(id:number): void {
    this.http.get(`http://localhost:8080/api/animals/` + id).subscribe({
      next: (response: any) => {
        this.editAnimalForm.patchValue({
          name: response.name,
          species: response.species,
          age: response.age,
          sex: response.sex,
          description: response.description,
          location: response.location,
          picture: response.picture
        });
      },
      error: (error) => {
        console.error('Error fetching animal details:', error);
        alert('Failed to load animal details. Please try again later.');
      }
    });
  }

  onSubmit(): void {
    if (this.editAnimalForm.valid) {
      const formData = new FormData();
      formData.append('name', this.editAnimalForm.get('name')?.value);
      formData.append('species', this.editAnimalForm.get('species')?.value);
      formData.append('age', this.editAnimalForm.get('age')?.value);
      formData.append('sex', this.editAnimalForm.get('sex')?.value);
      formData.append('location', this.editAnimalForm.get('location')?.value);
      formData.append('description', this.editAnimalForm.get('description')?.value);

      const picture = this.editAnimalForm.get('picture')?.value;
      if (picture) {
        formData.append('picture', picture);
      }

      this.http.put(`http://localhost:8080/api/animals/${this.animalId}`, formData)
      .subscribe({
        next: (response: any) => {
          console.log('Animal updated successfully:', response);
          this.router.navigate(['/dashboard']);  
          alert('Animal updated successfully!');
        },
        error: (error) => {
          console.error('Error updating animal:', error);
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Handle file change (optional on edit)
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editAnimalForm.patchValue({ picture: file });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']); 
  }
}
