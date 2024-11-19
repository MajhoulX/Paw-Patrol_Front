import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainpageComponent } from './mainpage/mainpage.component';

export const routes: Routes = [
    {path: "home", component:LandingpageComponent},
    {path: "login", component:LoginComponent},
    {path: "signup", component:SignupComponent},
    {path: "about", component:AboutComponent},
    {path: "contact", component:ContactComponent},
    {path: "adopt", component:MainpageComponent}
    

];
