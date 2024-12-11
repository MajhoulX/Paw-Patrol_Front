import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addanimal.component.html',
  styleUrls: ['./addanimal.component.scss']
})
export class AddAnimalComponent {
  addAnimalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.addAnimalForm = this.fb.group({
      name: ['', [Validators.required]],
      species: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Only numbers
      sex: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      picture: ['', [Validators.required]]  // Assuming you are handling the picture upload
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.addAnimalForm.controls;
  }

  onSubmit(): void {
    if (this.addAnimalForm.valid) {
      const formData = new FormData();
      formData.append('name', this.addAnimalForm.get('name')?.value);
      formData.append('species', this.addAnimalForm.get('species')?.value);
      formData.append('age', this.addAnimalForm.get('age')?.value);
      formData.append('sex', this.addAnimalForm.get('sex')?.value);
      formData.append('location', this.addAnimalForm.get('location')?.value);
      formData.append('description', this.addAnimalForm.get('description')?.value);
      formData.append('picture', this.addAnimalForm.get('picture')?.value); // File

      this.http.post('http://localhost:8080/api/animals', formData).subscribe({
        next: (response: any) => {
          console.log('Animal added successfully:', response);
          this.router.navigate(['/dashboard']);  // Redirect to animals list or dashboard
          alert('Animal added successfully!');
        },
        error: (error) => {
          console.error('Error adding animal:', error);
          alert('There was an error adding the animal. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.addAnimalForm.patchValue({ picture: file });
    }
  }
  goBack() {
    this.router.navigate(['/dashboard']);  // Adjust the route as needed
  }
}
