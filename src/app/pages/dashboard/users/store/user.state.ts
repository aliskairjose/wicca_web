import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { TotalUsersInterface, UserInterface } from '../user.interface';
import { UserService } from '../services/user.service';
import { UserAction } from './user.actions';
import { ResponseInterface } from '@shared/interfaces';

export interface UsersStateModel {
  users: ResponseInterface<UserInterface> | undefined;
  selectedUser: UserInterface | undefined;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: undefined,
    selectedUser: undefined,
  },
})
@Injectable()
export class UsersState {
  #userService = inject(UserService);

  @Action(UserAction.Get)
  get(ctx: StateContext<UsersStateModel>, { id }: UserAction.Get) {
    const state = ctx.getState();
    return (state.selectedUser?._id === id)
      ? ctx
      : this.#userService
        .byId(id)
        .pipe(
          tap((selectedUser: UserInterface) => ctx.patchState({ selectedUser })
          )
        );
  }

  @Action(UserAction.List)
  list(ctx: StateContext<UsersStateModel>, { payload, pagination }: UserAction.List) {
    payload ??= {};
    return this.#userService
      .list(payload, pagination)
      .pipe(
        tap((users: ResponseInterface<UserInterface>) => ctx.patchState({ users })
        )
      );
  }

  @Action(UserAction.Delete)
  delete(ctx: StateContext<UsersStateModel>, { id }: UserAction.Delete) {
    let state = ctx.getState();
    return this.#userService
      .delete(id)
      .pipe(tap((user: UserInterface) => {
        state.users?.results.map(u => (u._id === user._id) ? user : u);
        ctx.patchState({ users: state.users });
      })
      );
  }

}
