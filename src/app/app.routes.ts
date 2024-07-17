import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { loggedInGuardGuard } from './core/guards/logged-in-guard.guard';
import { loggedOutGuardGuard } from './core/guards/logged-out-guard.guard';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent, canActivate: [loggedInGuardGuard] },
    { path: 'login', component: LoginComponent, canActivate: [loggedOutGuardGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [loggedOutGuardGuard] }
];