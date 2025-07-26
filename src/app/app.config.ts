import {
  ApplicationConfig,
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
import { environmentDev } from '@envs/env.devs';
import { UsersState } from './pages/dashboard/users/store/user.state';
import { HomeState } from './pages/dashboard/home/store/home.state';
import { ChatState } from './pages/dashboard/chat/store/chat.state';
import { RequestLogsState } from './pages/dashboard/request-logs/store/request.state';
import { PaymentState } from './pages/dashboard/payments/store/payment.state';

registerLocaleData(localeEsAr, 'es-Ar');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    provideStore(
      [AuthState, UsersState, HomeState, ChatState, RequestLogsState, PaymentState],
      {
        developmentMode: !environmentDev.production,
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
