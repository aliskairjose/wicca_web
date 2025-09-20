import { inject, Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { UserInterface } from '../user.interface';
import { UserService } from '../services/user.service';
import { UserAction } from './user.actions';
import { ResponseInterface } from '@shared/interfaces';
import { AccumulatedTimeInterfaceMonthInterface } from '../../advisors/interfaces/accumulated-time-month.interface';
import { RoleEnum } from '@shared/enums';

export interface UsersStateModel {
  users: ResponseInterface<UserInterface> | undefined;
  selectedUser: UserInterface | undefined;
  selectedAdvisor: UserInterface | undefined;
  newUser: UserInterface | undefined;
  monthlyTimeAccumulated: AccumulatedTimeInterfaceMonthInterface | undefined;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: undefined,
    selectedUser: undefined,
    selectedAdvisor: undefined,
    newUser: undefined,
    monthlyTimeAccumulated: undefined
  },
})
@Injectable()
export class UsersState {
  #userService = inject(UserService);

  @Action(UserAction.GetMonthlyTimeAccumulated)
  getMonthlyTimeAccumulated(ctx: StateContext<UsersStateModel>, { id }: UserAction.GetMonthlyTimeAccumulated) {
    const state = ctx.getState();
    return (state.selectedUser?._id === id)
      ? ctx
      : this.#userService
        .getMonthlyTimeAccumulated(id)
        .pipe(tap((monthlyTimeAccumulated: AccumulatedTimeInterfaceMonthInterface) => ctx.patchState({ monthlyTimeAccumulated })));
  }

  @Action(UserAction.Create)
  create(ctx: StateContext<UsersStateModel>, { payload }: UserAction.Create) {
    return this.#userService
      .create(payload)
      .pipe(tap((newUser: UserInterface) => ctx.patchState({ newUser })));
  }

  @Action(UserAction.Get)
  get(ctx: StateContext<UsersStateModel>, { id }: UserAction.Get) {
    const state = ctx.getState();
    return (state.selectedUser?._id === id)
      ? ctx
      : this.#userService
        .byId(id)
        .pipe(
          tap((user: UserInterface) => {
            if (user.role === RoleEnum.Advisor) {
              ctx.patchState({ selectedAdvisor: user });
            }
            if (user.role === RoleEnum.Advisor) {
              ctx.patchState({ selectedUser: user });
            }
          }
          )
        );
  }

  @Action(UserAction.CreateAdvisorInfo)
  createAdvisor(ctx: StateContext<UsersStateModel>, { payload }: UserAction.CreateAdvisorInfo) {
    return this.#userService.createdvisorInfo(payload);
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
