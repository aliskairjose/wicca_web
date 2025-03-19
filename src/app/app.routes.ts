import { Routes } from '@angular/router';
import { RoutesEnum } from '@shared/enums';
import { authGuard } from '@shared/guards';

export const routes: Routes = [
  {
    path: RoutesEnum.Landing,
    title: 'Wicca',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: RoutesEnum.Login,
    title: 'Login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: RoutesEnum.Dashboard,
    title: 'Dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
];
