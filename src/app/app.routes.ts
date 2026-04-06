import { Routes } from '@angular/router';
import { RoutesEnum, RoutesTitlesEnum } from '@shared/enums';
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
        title: RoutesTitlesEnum.Login,
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: `${RoutesEnum.VerifyEmail}/:id`,
        title: RoutesTitlesEnum.VerifyAccount,
        loadComponent: () =>
          import('./pages/auth/verify-account/verify-account.component').then(
            (m) => m.VerifyAccountComponent
          ),
      },
      {
        path: `${RoutesEnum.Wompi}/:id`,
        loadComponent: () =>
          import('./pages/auth/wompi/wompi.component').then(
            (m) => m.WompiComponent
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
        title: RoutesTitlesEnum.Home,
        loadComponent: () =>
          import('./pages/landing/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: RoutesEnum.AboutUs,
        title: RoutesTitlesEnum.AboutUs,
        loadComponent: () =>
          import('./pages/landing/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
      {
        path: RoutesEnum.AdvisorPolicy,
        title: RoutesTitlesEnum.AdvisorPolicy,
        loadComponent: () =>
          import('./pages/landing/advisor-policy/advisor-policy.component').then(
            (m) => m.AdvisorPolicyComponent
          ),
      },
    ],
  },
  {
    path: RoutesEnum.Dashboard,
    title: RoutesTitlesEnum.Dashboard,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: '',
        title: RoutesTitlesEnum.Dashboard,
        loadComponent: () =>
          import('./pages/dashboard/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: RoutesEnum.Users,
        title: RoutesTitlesEnum.Users,
        loadComponent: () =>
          import('./pages/dashboard/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: `${RoutesEnum.Users}/${RoutesEnum.User}/:id`,
        title: RoutesTitlesEnum.Users,
        loadComponent: () =>
          import('./pages/dashboard/users/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: RoutesEnum.Advisors,
        title: RoutesTitlesEnum.Advisors,
        loadComponent: () =>
          import('./pages/dashboard/advisors/advisors.component').then(
            (m) => m.AdvisorsComponent
          ),
      },
      {
        path: `${RoutesEnum.Advisors}/${RoutesEnum.User}/:id`,
        title: RoutesTitlesEnum.User,
        loadComponent: () =>
          import('./pages/dashboard/advisors/advisor/advisor.component').then(
            (m) => m.AdvisorComponent
          ),
      },
      {
        path: RoutesEnum.Payments,
        title: RoutesTitlesEnum.Payments,
        loadComponent: () =>
          import('./pages/dashboard/payments/payments.component').then(
            (m) => m.PaymentsComponent
          ),
      },
      {
        path: RoutesEnum.Categories,
        title: RoutesTitlesEnum.Categories,
        loadComponent: () =>
          import('./pages/dashboard/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: RoutesEnum.Chats,
        title: RoutesTitlesEnum.Chats,
        loadComponent: () =>
          import('./pages/dashboard/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
      },
      {
        path: RoutesEnum.Banks,
        title: RoutesTitlesEnum.Banks,
        loadComponent: () =>
          import('./pages/dashboard/banks/banks.component').then(
            (m) => m.BanksComponent
          ),
      },
      {
        path: RoutesEnum.BanksAccounts,
        title: RoutesTitlesEnum.BanksAccounts,
        loadComponent: () =>
          import('./pages/dashboard/bank-accounts/bank-accounts.component').then(
            (m) => m.BankAccountsComponent
          ),
      },
      {
        path: RoutesEnum.RequestLogs,
        title: RoutesTitlesEnum.RequestLogs,
        loadComponent: () =>
          import('./pages/dashboard/request-logs/request-logs.component').then(
            (m) => m.RequestLogsComponent
          ),
      },
    ],
  },
];
