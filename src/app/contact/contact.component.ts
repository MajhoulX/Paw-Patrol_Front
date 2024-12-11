import { Component,inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, FormControlStatus, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule,MatIconModule,CommonModule, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = { name: '', email: '', message: '' }; 

  constructor(private http: HttpClient) {}

  // Method to handle form submission
  sendEmail(contactForm: NgForm) {
    if (contactForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;  // If form is invalid, stop further action
    }

    // Prepare the email data
    const emailData = {
      name: this.formData.name,
      email: this.formData.email,
      message: this.formData.message
    };

    // Send the data to the backend to handle the email sending
    this.http.post('http://localhost:8080/send-email', emailData).subscribe(
      response => {
        console.log('Email sent successfully!', response);
        alert('Your message has been sent!');
      },
      error => {
        console.error('Error sending the email', error);
        alert('Failed to send the message. Please try again later.');
      }
    );
  }
}