import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { HomeService } from "../home.service";
import { HomeAction } from './home.actions';
import { tap } from "rxjs";
import { SummaryMonthlyStatusInterface, SummaryStatusInterface } from "../interfaces/request-pie-chart.interface";
import { RequestLogsService } from "../../request-logs/request-logs.service";
import { UserService } from "../../users/services/user.service";
import { AccumulatedTimeInterface, UserSummaryInterface } from "../../request-logs/interfaces/summary.interface";
import { TopRatedInterface } from "../interfaces/top-rated.interface";
import { UserInterface } from "../../users/user.interface";

export interface HomeStateModel {
  nominatedAdvisors: UserInterface[] | [];
  topRatedAdvisors: TopRatedInterface[] | [];
  newRegistrations: UserInterface[] | [];
  summaryUser: UserSummaryInterface | undefined;
  accumulatedTime: AccumulatedTimeInterface[] | [];
  summaryStatus: SummaryStatusInterface[] | [];
  summaryMonthlyStatus: SummaryMonthlyStatusInterface[] | [];
}

@State<HomeStateModel>({
  name: 'home',
  defaults: {
    nominatedAdvisors: [],
    topRatedAdvisors: [],
    accumulatedTime: [],
    newRegistrations: [],
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


  @Action(HomeAction.GetNominatedAdvisors)
  getNominatedAdvisors(ctx: StateContext<HomeStateModel>) {
    return this.#homeService
      .getNominatedAdvisors()
      .pipe(
        tap(nominatedAdvisors => ctx.patchState({ nominatedAdvisors })
        )
      );
  }

  @Action(HomeAction.GetAccumulatedTime)
  getAccumulatedTime(ctx: StateContext<HomeStateModel>) {
    return this.#homeService
      .getAccumulatedTime()
      .pipe(
        tap(accumulatedTime => ctx.patchState({ accumulatedTime })
        )
      );
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

  @Action(HomeAction.GetUserSummary)
  getUserSummary(ctx: StateContext<HomeStateModel>) {
    return this.#userService
      .getSummaryUser()
      .pipe(
        tap(summaryUser => ctx.patchState({ summaryUser })
        )
      );
  }

  @Action(HomeAction.GetNewRegistrations)
  getNewRegistrations(ctx: StateContext<HomeStateModel>) {
    return this.#homeService
      .getNewRegistrations()
      .pipe(
        tap(newRegistrations => ctx.patchState({ newRegistrations })
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
