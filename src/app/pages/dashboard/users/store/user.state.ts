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
    let state = ctx.getState();
    return this.#userService
      .list(payload, pagination)
      .pipe(
        tap((users: ResponseInterface<UserInterface>) => ctx.patchState({ users })
        )
      );
    return state.users ?? this.#userService
      .list(payload, pagination)
      .pipe(
        tap((users: ResponseInterface<UserInterface>) => ctx.patchState({ users })
        )
      );
  }

  @Action(UserAction.Update)
  update(ctx: StateContext<UsersStateModel>, { id, payload }: UserAction.Update) {
    let state = ctx.getState();
    return this.#userService
      .update(id, payload)
      .pipe(tap((user: UserInterface) => {
        const data: ResponseInterface<UserInterface> = {
          metadata: state.users!.metadata,
          results: []
        }
        data.results = state.users!.results.map(u => (u._id === id) ? user : u);
        ctx.patchState({ users: data });
      })
      );
  }

}
