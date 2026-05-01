import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RoutesEnum, ToastTypeEnum } from '@shared/enums';
import { ToastService } from '@shared/services';
import { catchError, map, throwError } from 'rxjs';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerErrorDictionary } from '@shared/dictionaries';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const store = inject(Store);
  const toast = inject(ToastService);
  const spinner = inject(NgxSpinnerService);

  const token: Signal<string | null> = store.selectSignal(AuthSelectors.token);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token()}`,
    },
  });

  spinner.show();

  return next(cloneRequest).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) spinner.hide();
      return event;
    }),
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        spinner.hide();
        console.log(error.error.message);
        switch (error.status) {
          case 400:
            toast.show(ServerErrorDictionary[400], ToastTypeEnum.Error);
            break;
          case 401:
            toast.show(ServerErrorDictionary[401], ToastTypeEnum.Error);
            router.navigate([`auth/${RoutesEnum.Login}`]);
            break;
          case 403:
            toast.show(ServerErrorDictionary[403], ToastTypeEnum.Error);
            router.navigate([`auth/${RoutesEnum.Login}`]);
            break;
          case 404:
            toast.show(ServerErrorDictionary[404], ToastTypeEnum.Error);
            break;
          case 500:
            toast.show(ServerErrorDictionary[500], ToastTypeEnum.Error);
            break;
          // You can handle more status codes here as needed
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', error);
      }
      return throwError(() => error);
    })
  );
};
