import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./components/register/register').then((m) => m.Register),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/shell/shell').then((m) => m.Shell),
    children: [
      { path: '', redirectTo: 'pocetna', pathMatch: 'full' },
      {
        path: 'pocetna',
        loadComponent: () => import('./components/pocetna/pocetna').then((m) => m.Pocetna),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
