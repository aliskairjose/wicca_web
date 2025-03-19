import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from './auth.model';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: null,
  },
})
@Injectable()
export class AuthState {
  #authService = inject(AuthService);

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    return this.#authService.login(action.payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          token: result.token,
          user: result.user,
        });
      })
    );
  }

  @Action(AuthActions.Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.#authService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          user: null,
        });
      })
    );
  }
  // @Action(AuthActions.Register)
  // register(ctx: StateContext<AuthStateModel>, action: AuthActions.Register) {
  //   return this.#authService.register(action.payload).pipe(
  //     tap(() => {
  //       ctx.setState({
  //         token: null,
  //         user: null,
  //       });
  //     })
  //   );
  // }
}
