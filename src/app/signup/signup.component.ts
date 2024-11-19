import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, FormControlStatus, FormsModule, ReactiveFormsModule, Validators,FormGroupDirective,
  NgForm, } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material/core';
import { NavbarComponent } from '../navbar/navbar.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  
}

