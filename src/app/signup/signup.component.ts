import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  FormControl, FormControlStatus, FormsModule, ReactiveFormsModule, Validators, FormGroupDirective,
  NgForm, FormBuilder, FormGroup
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Check if the user is already logged in
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      // If logged in, redirect to the user dashboard
      this.router.navigate(['/user-dashboard']);
    }
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
  
      console.log('Submitting signup form:', formData); // Debug form data
  
      this.http.post('http://localhost:8080/auth/signup', formData).subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          if (response.data.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/adopt']);
          }
        },
        error: (error) => {
          console.error('Signup failed:', error);
          if (error.status === 400 && error.error?.errors) {
            alert('Signup failed: ' + JSON.stringify(error.error.errors));
          } else {
            alert('Signup failed due to a server error. Please try again later.');
          }
        }
        
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  
}

