import { inject, Signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastService } from '@shared/services';
import {
  MessageEnum,
  RoutesEnum,
  RoleEnum,
  ToastTypeEnum,
} from '@shared/enums';
import { AuthSelectors } from 'src/app/pages/auth/store/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const isAuth: Signal<boolean> = store.selectSignal(
    AuthSelectors.isAuthenticated
  );

  const user = store.selectSnapshot(AuthSelectors.userLogged);

  if ( isAuth() && user?.role === RoleEnum.Admin ) return true;

  toastService.show(MessageEnum.UnAuthorized, ToastTypeEnum.Error);

  router.navigate([RoutesEnum.Landing]);
  return false;
};
