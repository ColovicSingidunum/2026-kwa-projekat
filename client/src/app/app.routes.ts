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
      {
        path: 'projekti',
        loadComponent: () => import('./components/projekti/projekti').then((m) => m.Projekti),
      },
      {
        path: 'projekti/novi',
        loadComponent: () =>
          import('./components/projekat-forma/projekat-forma').then((m) => m.ProjekatForma),
      },
      {
        path: 'projekti/:id',
        loadComponent: () =>
          import('./components/projekat-detalji/projekat-detalji').then((m) => m.ProjekatDetalji),
      },
      {
        path: 'projekti/:id/izmena',
        loadComponent: () =>
          import('./components/projekat-forma/projekat-forma').then((m) => m.ProjekatForma),
      },
      {
        path: 'projekti/:id/zadaci/novi',
        loadComponent: () =>
          import('./components/zadatak-forma/zadatak-forma').then((m) => m.ZadatakForma),
      },
      {
        path: 'projekti/:id/zadaci/:zadatakId',
        loadComponent: () =>
          import('./components/zadatak-forma/zadatak-forma').then((m) => m.ZadatakForma),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
