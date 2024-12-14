import { Routes,RouterModule} from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { NgModule } from '@angular/core';
import { AddAnimalComponent } from './addanimal/addanimal.component';
import { UpdateAnimalComponent } from './updateanimal/updateanimal.component';

export const routes: Routes = [
    // Public routes
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: LandingpageComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "about", component: AboutComponent },
    { path: "contact", component: ContactComponent },
    { path: "adopt", component: MainpageComponent },
    { path: "dashboard", component: AdmindashboardComponent },
    { path: "add", component:AddAnimalComponent},
    { path: "edit/:id", component:UpdateAnimalComponent},


  // protected to do later
    // {
    //   path: 'dashboard',
    //   component: UserDashboardComponent,
    //   canActivate: [AuthGuard],
    //   data: { roles: ['user', 'admin'] }, // Accessible to both roles
    // },
    // {
    //   path: 'admin-dashboard',
    //   component: AdminDashboardComponent,
    //   canActivate: [AuthGuard],
    //   data: { roles: ['admin'] }, // Admin-only
    // },
    
  
    // Fallback for unknown routes
    { path: "**", redirectTo: "home" },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  
