import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post('http://localhost:8080/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      }).subscribe({
        next: (response: any) => {
          console.log('Login successful:', response);
          if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          if (response.data.role === 'admin') {
            this.router.navigate(['/dashboard']);
            alert('Welcome Admin !');
          } else {
            this.router.navigate(['/adopt']);
            alert('Welcome User !');
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          alert(error.error?.message || 'Login failed. Please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
