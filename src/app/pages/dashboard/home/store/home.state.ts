import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { HomeService } from "../home.service";
import { HomeAction } from './home.actions';
import { tap } from "rxjs";
import { SummaryMonthlyStatusInterface, SummaryStatusInterface } from "../interfaces/request-pie-chart.interface";
import { RequestLogsService } from "../../request-logs/request-logs.service";
import { UserService } from "../../users/services/user.service";
import { UserSummaryInterface } from "../../request-logs/interfaces/summary.interface";
import { TopRatedInterface } from "../interfaces/top-rated.interface";

export interface HomeStateModel {
  topRatedAdvisors: TopRatedInterface[] | undefined;
  summaryUser: UserSummaryInterface | undefined;
  summaryStatus: SummaryStatusInterface[] | [];
  summaryMonthlyStatus: SummaryMonthlyStatusInterface[] | [];
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    topRatedAdvisors: undefined,
    summaryUser: undefined,
    summaryStatus: [],
    summaryMonthlyStatus: []

  }
})
@Injectable()
export class HomeState {
  #homeService = inject(HomeService);
  #requestService = inject(RequestLogsService);
  #userService = inject(UserService);

  @Action(HomeAction.GetSummaryStatus)
  getSummaryStatus(ctx: StateContext<HomeStateModel>) {
    return this.#requestService
      .getGroupBy()
      .pipe(
        tap(summaryStatus => ctx.patchState({ summaryStatus })
        )
      );
  }

  @Action(HomeAction.GetUserSummary)
  getUserSummary(ctx: StateContext<HomeStateModel>) {
    return this.#userService
      .getSummaryUser()
      .pipe(
        tap(summaryUser => ctx.patchState({ summaryUser })
        )
      );
  }


  @Action(HomeAction.GetTopAdvisors)
  GetTopAdvisors(ctx: StateContext<HomeStateModel>) {
    return this.#homeService
      .getTopAdvisors()
      .pipe(
        tap(topRatedAdvisors => ctx.patchState({ topRatedAdvisors })
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
