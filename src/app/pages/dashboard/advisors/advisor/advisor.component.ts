import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { RoleEnum, StatusEnum } from '@shared/enums';
import { IconComponent, AvatarComponent, CircularChartComponent, ProgressBarComponent, RateStatsComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../users/user.interface';
import { UserSelectors } from '../../users/store/user.selectors';
import { UserAction } from '../../users/store/user.actions';
import { AccumulatedTimeInterfaceMonthInterface } from '../interfaces/accumulated-time-month.interface';
import { MONTHS } from '@shared/constansts';
import { RequestLogStatussEnum } from '../../request-logs/enums/request-logs.enum';

const ConnStatus: any = {
  Online: 'online-top',
  Offline: 'busy-top',
  Busy: 'away-top',
  Away: 'offline-top',
};

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [CommonModule, IconComponent, AvatarComponent, CircularChartComponent, RateStatsComponent],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorComponent {
  months = MONTHS;
  statusEnum = StatusEnum;
  role = RoleEnum;
  user: UserInterface | undefined;
  timeAccumulatedMonthly: AccumulatedTimeInterfaceMonthInterface | undefined;
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  users: any[] = [];
  labels = ['Aceptados', 'Rechazados'];
  timeLabel: string[] = [];
  timeAccumulated: number[] = [];

  fullName = computed(() => `${this.user?.name} ${this.user?.lastName}`);
  statusClass = computed(() => {
    const connectStatus = this.user?.connectStatus ?? 'away-top';
    return ConnStatus[connectStatus];
  });

  constructor() {
    this._getData();
  }

  totalEarnings = computed(() => (this.user?.wallet?.balance ?? 0) * 0.4);

  // rateAvg = computed((): number => {
  //   const reviews = this.user!.reviews!;
  //   if (reviews.length === 0) return 0;
  //   const total = reviews.reduce((acc, r) => acc + r.rate, 0);
  //   return total / reviews.length;
  // });

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
    await firstValueFrom(this.#store.dispatch(new UserAction.Get(params['id'])));
    await firstValueFrom(this.#store.dispatch(new UserAction.GetMonthlyTimeAccumulated(params['id'])));
    this.user = this.#store.selectSnapshot(UserSelectors.selectedAdvisor);
    this.timeAccumulatedMonthly = this.#store.selectSnapshot(UserSelectors.monthlyTimeAccumulated);
    this._timeAccumulatedFormat();
  }
}
