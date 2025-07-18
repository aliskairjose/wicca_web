import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { HomeService } from "../home.service";
import { HomeAction } from './home.actions';
import { tap } from "rxjs";
import { DashboardInterface } from "../interfaces/dashboard.interface";
import { SummaryMonthlyStatusInterface, SummaryStatusInterface } from "../interfaces/request-pie-chart.interface";
import { RequestLogsService } from "../../request-logs/request-logs.service";
import { UserService } from "../../users/services/user.service";
import { UserSummaryInterface } from "../../request-logs/interfaces/summary.interface";

export interface HomeStateModel {
  dashboard: DashboardInterface | undefined;
  summaryUser: UserSummaryInterface | undefined;
  summaryStatus: SummaryStatusInterface[] | [];
  summaryMonthlyStatus: SummaryMonthlyStatusInterface[] | [];
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    dashboard: undefined,
    summaryUser: undefined,
    summaryStatus: [],
    summaryMonthlyStatus: []

  }
})
@Injectable()
export class HomeState {
  #homeService = inject(HomeService);
  #userService = inject(UserService);
  #requestService = inject(RequestLogsService);

  @Action(HomeAction.Get)
  get(ctx: StateContext<HomeStateModel>) {
    return this.#homeService.get().pipe(tap(dashboard => ctx.patchState({ dashboard })));
  }

  @Action(HomeAction.Get)
  getSummaryUser(ctx: StateContext<HomeStateModel>) {
    return this.#userService.getSummaryUser().pipe(tap(summaryUser => ctx.patchState({ summaryUser })));
  }

  @Action(HomeAction.GetSummaryStatus)
  getSummaryStatus(ctx: StateContext<HomeStateModel>) {
    return this.#requestService
      .getGroupBy()
      .pipe(
        tap(summaryStatus => ctx.patchState({ summaryStatus })
        )
      );
  }

  @Action(HomeAction.GetSummaryMonthlyStatus)
  getSummaryMonthlyStatus(ctx: StateContext<HomeStateModel>, { year }: HomeAction.GetSummaryMonthlyStatus) {
    return this.#requestService
      .getSummaryMonthlyStatusByYear(year)
      .pipe(
        tap(summaryMonthlyStatus => ctx.patchState({ summaryMonthlyStatus })
        )
      );
  }
}
