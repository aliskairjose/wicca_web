import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { httpInterceptor } from './shared/interceptors';
import { AuthState } from './pages/auth/store/auth.state';
import { UsersState } from './pages/dashboard/users/store/user.state';
import { HomeState } from './pages/dashboard/home/store/home.state';
import { ChatState } from './pages/dashboard/chat/store/chat.state';
import { RequestLogsState } from './pages/dashboard/request-logs/store/request.state';
import { PaymentState } from './pages/dashboard/payments/store/payment.state';
import { CategoryState } from './pages/dashboard/categories/store/category.state';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { environment } from '@envs/environment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BankState } from './pages/dashboard/banks/store/bank.state';

registerLocaleData(localeEsAr, 'es-Ar');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
    provideEnvironmentNgxMask(),
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideStore(
      [AuthState, UsersState, HomeState, ChatState, RequestLogsState, PaymentState, CategoryState, BankState],
      {
        developmentMode: !environment.production,
      },
      withNgxsReduxDevtoolsPlugin(),
      // withNgxsFormPlugin(),
      // withNgxsLoggerPlugin(),
      // withNgxsRouterPlugin(),
      withNgxsStoragePlugin({ keys: [AuthState] }),
      withNgxsWebSocketPlugin({ url: 'http://192.168.1.15:3000' }),

    ),

  ],
};
