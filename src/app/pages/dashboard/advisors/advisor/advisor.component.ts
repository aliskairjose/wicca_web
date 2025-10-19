import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { RoleEnum, StatusEnum } from '@shared/enums';
import { IconComponent, AvatarComponent, CircularChartComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../users/user.interface';
import { UserSelectors } from '../../users/store/user.selectors';
import { UserAction } from '../../users/store/user.actions';
import { AccumulatedTimeInterfaceMonthInterface } from '../interfaces/accumulated-time-month.interface';
import { MONTHS } from '@shared/constansts';

const ConnStatus = {
  Online: 'online-top',
  Offline: 'busy-top',
  Busy: 'away-top',
  Away: 'offline-top',
};

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [CommonModule, IconComponent, AvatarComponent, CircularChartComponent],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorComponent {
  months = MONTHS;
  statusEnum = StatusEnum;
  role = RoleEnum;
  user = signal<UserInterface | undefined>(undefined)
  timeAccumulatedMonthly: AccumulatedTimeInterfaceMonthInterface | undefined;
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  users: any[] = [];
  labels = ['Aceptados', 'Rechazados'];
  timeLabel: string[] = [];
  timeAccumulated: number[] = [];

  fullName = computed(() => `${this.user()?.name} ${this.user()?.lastName}`);
  statusClass = computed(() => {
    const connectStatus = this.user()?.connectStatus;
    return connectStatus ? ConnStatus[connectStatus] ?? '' : '';
  });

  constructor() {
    this._getData();
  }


  get requestsStatus() {
    const rejects = this.user()?.requestLogs.filter(logs => logs.status === 'Rechazado');
    const accepts = this.user()?.requestLogs.filter(logs => logs.status === 'Aceptado');
    return {
      rejects: rejects!.length,
      accepts: accepts!.length,
    }
  }

  private _timeAccumulatedFormat() {
    this.timeAccumulatedMonthly?.types.forEach(t => {
      this.timeLabel.push(t.type);
      this.timeAccumulated.push(t.totalTimeInSeconds);
    });

  }

  get totalEarnings() {
    return (this.user()?.wallet?.balance ?? 0) * 0.4;
  }

  private async _getData() {
    const params: Params = await firstValueFrom(this.#route.params);
    await firstValueFrom(this.#store.dispatch(new UserAction.Get(params['id'])));
    await firstValueFrom(this.#store.dispatch(new UserAction.GetMonthlyTimeAccumulated(params['id'])));
    this.user.set(this.#store.selectSnapshot(UserSelectors.selectedUser));
    this.timeAccumulatedMonthly = this.#store.selectSnapshot(UserSelectors.monthlyTimeAccumulated);
    this._timeAccumulatedFormat();
  }
}
