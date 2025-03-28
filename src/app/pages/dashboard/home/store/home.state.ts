import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { HomeService } from "../home.service";
import { HomeAction } from "./home.actions";
import { tap } from "rxjs";

export interface HomeStateModel {
  dashboard: any;
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    dashboard: undefined
  }
})
@Injectable()
export class HomeState {
  #homeService = inject(HomeService);

  @Action(HomeAction.Get)
  get(ctx: StateContext<HomeStateModel>) {
    return this.#homeService.get().pipe(tap(dashboard => ctx.patchState({ dashboard })));
  }
}
