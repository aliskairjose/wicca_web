import { Routes } from '@angular/router';
import { RoleEnum, RoutesEnum } from '@shared/enums';
import { authGuard } from '@shared/guards';
import { HomeComponent } from './pages/dashboard/home/home.component';

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
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () =>
          import('./pages/dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: RoutesEnum.Users,
        title: 'Listado de usuarios',
        loadComponent: () =>
          import('./pages/dashboard/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: RoutesEnum.Chats,
        title: 'Listado de chsta',
        loadComponent: () =>
          import('./pages/dashboard/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
      },
      {
        path: `${RoutesEnum.Users}/${RoutesEnum.User}/:id`,
        title: 'Detalle de usuario',
        loadComponent: () =>
          import('./pages/dashboard/users/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
    ],
  },
];
