import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { RoleEnum, StatusEnum } from '@shared/enums';
import { CircularChartComponent, RateStatsComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../users/user.interface';
import { UserSelectors } from '../../users/store/user.selectors';
import { UserAction } from '../../users/store/user.actions';
import { AccumulatedTimeInterfaceMonthInterface } from '../interfaces/accumulated-time-month.interface';
import { MONTHS } from '@shared/constansts';
import { ResponseInterface, ReviewInterface } from '@shared/interfaces';
import { CommonAction } from '@shared/store/common.actions';
import { CommonSelectors } from '@shared/store/common.selectors';

const ConnStatus: { [key: string]: string } = {
  Online: 'online-top',
  Offline: 'offline-top',
  Busy: 'busy-top',
  Away: 'away-top',
};

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [CommonModule, CircularChartComponent, RateStatsComponent],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorComponent {
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  months = MONTHS;
  statusEnum = StatusEnum;

  role = RoleEnum;
  user: UserInterface | undefined;
  timeAccumulatedMonthly: AccumulatedTimeInterfaceMonthInterface | undefined;
  users: any[] = [];
  reviews: ResponseInterface<ReviewInterface> | undefined = this.#store.selectSnapshot(CommonSelectors.reviews);

  labels = ['Aceptados', 'Rechazados'];
  timeLabel: string[] = [];
  timeAccumulated: number[] = [];
  fullName = computed(() => `${this.user?.name} ${this.user?.lastName}`);

  statusClass = computed(() => {
    const connectStatus = this.user!.connectStatus;
    return ConnStatus[connectStatus];
  });

  constructor() {
    this._getData();
  }

  totalEarnings = computed(() => (this.user?.wallet?.balance ?? 0) * 0.4);


  // get requestsStatus() {
  //   const rejects = this.user?.requestLogs.filter(logs => logs.status === RequestLogStatussEnum.RECHAZADO);
  //   const accepts = this.user?.requestLogs.filter(logs => logs.status === RequestLogStatussEnum.APROBADO);
  //   return {
  //     rejects: rejects!.length,
  //     accepts: accepts!.length,
  //   }
  // }

  private _timeAccumulatedFormat() {
    this.timeAccumulatedMonthly?.types.forEach(t => {
      this.timeLabel.push(t.type);
      this.timeAccumulated.push(t.totalTimeInSeconds);
    });

  }

  private async _getData() {
    const params: Params = await firstValueFrom(this.#route.params);

    this.#store.dispatch([
      new UserAction.Get(params['id']),
      new UserAction.GetMonthlyTimeAccumulated(params['id']),
      new CommonAction.GetReviews({ reviewedTo: params['id'] }, { limit: 0, page: 1 })
    ]).subscribe(() => {
      this.user = this.#store.selectSnapshot(UserSelectors.selectedAdvisor);
      this.timeAccumulatedMonthly = this.#store.selectSnapshot(UserSelectors.monthlyTimeAccumulated);
      this._timeAccumulatedFormat();
    });

  }
}
