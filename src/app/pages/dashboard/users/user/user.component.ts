import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserAction } from '../store/user.actions';
import { UserSelectors } from '../store/user.selectors';
import { UserInterface } from '../user.interface';
import { firstValueFrom } from 'rxjs';
import { RoleEnum } from '@shared/enums';
import { IconComponent, AvatarComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { ApexChart, ApexFill, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';

type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
const ConnStatus = {
  Online: 'online-top', // Verde
  Offline: 'busy-top', // Rojo cambia de offline a busy por el color
  Busy: 'away-top', // Amarillo busy por away por el color
  Away: 'offline-top', // blanco cambia de away a offline por el color
};
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, IconComponent, AvatarComponent, NgApexchartsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserComponent implements OnInit {
  role = RoleEnum;
  user = signal<UserInterface | undefined>(undefined)

  #route = inject(ActivatedRoute);
  #store = inject(Store);
  users: any[] = [];

  chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      width: '100%',
      type: 'pie',
    },
    labels: ['Aceptados', 'Rechazados'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  fullName = computed(() => `${this.user()?.name} ${this.user()?.lastName}`);
  statusClass = computed(() => `${ConnStatus[this.user()!.connectStatus]}`)

  async ngOnInit() {
    const params: Params = await firstValueFrom(this.#route.params);
    await firstValueFrom(this.#store.dispatch(new UserAction.Get(params['id'])));
    this.user.set(this.#store.selectSnapshot(UserSelectors.selectedUser));
  }

  get requestsStatus() {
    const rejects = this.user()?.requestLogs.filter(logs => logs.status === 'Rechazado');
    const accepts = this.user()?.requestLogs.filter(logs => logs.status === 'Aceptado');
    return {
      rejects: rejects?.length,
      accepts: accepts?.length,
    }
  }
}
