import { Component } from '@angular/core';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterOutlet } from '@angular/router';
import { ContactComponent } from './contact/contact.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingpageComponent, LoginComponent, SignupComponent, RouterOutlet, ContactComponent],
  templateUrl:"./app.component.html",
  styleUrl:"./app.component.scss"
})
export class AppComponent {
  title = 'CIProject';
}
