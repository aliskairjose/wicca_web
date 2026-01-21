import { Routes } from '@angular/router';
import { RoutesEnum } from '@shared/enums';
import { authGuard } from '@shared/guards';
import { AppConfig } from '@shared/classes/app.config';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: RoutesEnum.Login,
        title: 'Login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: `${RoutesEnum.VerifyEmail}/:id`,
        title: 'Verify Account',
        loadComponent: () =>
          import('./pages/auth/verify-account/verify-account.component').then(
            (m) => m.VerifyAccountComponent
          ),
      },
    ]
  },
  {
    path: RoutesEnum.Landing,
    title: AppConfig.APP_NAME,
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
    children: [
      {
        path: RoutesEnum.Home,
        title: 'OrbeApp',
        loadComponent: () =>
          import('./pages/landing/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: RoutesEnum.AbuotUs,
        title: 'Quienes somos',
        loadComponent: () =>
          import('./pages/landing/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: RoutesEnum.AdvisorPolicy,
        title: 'Políticas de expertos',
        loadComponent: () =>
          import('./pages/landing/advisor-policy/advisor-policy.component').then(
            (m) => m.AdvisorPolicyComponent
          ),
      },
    ],
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
        path: RoutesEnum.Advisors,
        title: 'Listado de asesores',
        loadComponent: () =>
          import('./pages/dashboard/advisors/advisors.component').then(
            (m) => m.AdvisorsComponent
          ),
      },
      {
        path: RoutesEnum.Payments,
        title: 'Listado de pagos',
        loadComponent: () =>
          import('./pages/dashboard/payments/payments.component').then(
            (m) => m.PaymentsComponent
          ),
      },
      {
        path: RoutesEnum.Categories,
        title: 'Listado de categorías',
        loadComponent: () =>
          import('./pages/dashboard/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: RoutesEnum.Chats,
        title: 'Listado de chats',
        loadComponent: () =>
          import('./pages/dashboard/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
      },
      {
        path: RoutesEnum.Banks,
        title: 'Listado de bancos',
        loadComponent: () =>
          import('./pages/dashboard/banks/banks.component').then(
            (m) => m.BanksComponent
          ),
      },
      {
        path: RoutesEnum.BanksAccounts,
        title: 'Listado de cuentas',
        loadComponent: () =>
          import('./pages/dashboard/bank-accounts/bank-accounts.component').then(
            (m) => m.BankAccountsComponent
          ),
      },
      {
        path: RoutesEnum.RequestLogs,
        title: 'Histórico de solicitudes',
        loadComponent: () =>
          import('./pages/dashboard/request-logs/request-logs.component').then(
            (m) => m.RequestLogsComponent
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
      {
        path: `${RoutesEnum.Advisors}/${RoutesEnum.User}/:id`,
        title: 'Detalle de usuario',
        loadComponent: () =>
          import('./pages/dashboard/advisors/advisor/advisor.component').then(
            (m) => m.AdvisorComponent
          ),
      },
    ],
  },
];
