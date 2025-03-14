import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '@src/app/auth/store/auth.selector';
import { catchError, map, throwError } from 'rxjs';
import { RoutesEnum, ToastTypeEnum } from '@shared/enums';
import { ToastService } from '@shared/services';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const store = inject(Store);
  const toast = inject(ToastService);

  const token: Signal<string | null> = store.selectSignal(AuthSelectors.token);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return next(cloneRequest).pipe(
    map((event: HttpEvent<unknown>) => {
      // if (event instanceof HttpResponse) spinner.hide();
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (error.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', error);
          toast.show(error.error.message, ToastTypeEnum.Error);
          router.navigate([RoutesEnum.Login]);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', error);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', error);
      }
      return throwError(() => error);
    })
  );
};
