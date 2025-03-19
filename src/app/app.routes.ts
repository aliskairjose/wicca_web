import { Routes } from '@angular/router';
import { RoutesEnum } from '@shared/enums';

export const routes: Routes = [
  {
    path: RoutesEnum.Landing,
    title: 'Wicca',
    loadComponent: () => import('./pages/landing/landing.component').then((m)=> m.LandingComponent),
  },
  {
    path: RoutesEnum.Login,
    title: 'Login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
  },
];
