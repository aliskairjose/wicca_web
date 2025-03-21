import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { UserInterface } from '../user.interface';
import { UserService } from '../services/user.service';
import { UserAction } from './user.actions';

export interface UsersStateModel {
  users: UserInterface[];
  user: UserInterface | undefined;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    user: undefined,
  },
})
@Injectable()
export class UsersState {
  #userService = inject(UserService);

  @Action(UserAction.Add)
  add(ctx: StateContext<UsersStateModel>, { payload }: UserAction.Add) {
    const stateModel = ctx.getState();
    stateModel.users = [...stateModel.users, payload];
    ctx.setState(stateModel);
  }

  // @Action(UserAction.Update)
  // update(ctx: StateContext<UsersStateModel>, { payload }: UserAction.Update) {
  //   const stateModel = ctx.getState();
  //   stateModel.users = [...stateModel.users, payload];
  //   ctx.setState(stateModel);
  // }

  @Action(UserAction.Get)
  get(ctx: StateContext<UsersStateModel>, { id }: UserAction.Get) {
    return this.#userService
      .byId(id)
      .pipe(tap((user: UserInterface) => ctx.patchState({ user })));
  }

  @Action(UserAction.List)
  list(ctx: StateContext<UsersStateModel>) {
    return this.#userService
      .list()
      .pipe(tap((users: UserInterface[]) => ctx.patchState({ users })));
  }

  @Action(UserAction.Clear)
  clear(ctx: StateContext<UsersStateModel>) {
    ctx.patchState({
      users: [],
      user: undefined,
    });
  }
}
