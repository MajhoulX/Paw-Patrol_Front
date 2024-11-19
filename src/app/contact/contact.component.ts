import { Component,inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormControl, FormControlStatus, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule,NavbarComponent,MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private _snackBar = inject(MatSnackBar);
white: string|null|undefined;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    
  }
}
