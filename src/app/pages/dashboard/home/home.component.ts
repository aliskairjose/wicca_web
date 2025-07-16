import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvatarComponent, IconComponent } from '@shared/components';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HomeSelectors } from './store/home.selectors';
import { firstValueFrom } from 'rxjs';
import { HomeAction } from './store/home.actions';
import { RequestPieChart } from './interfaces/request-pie-chart.interface';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent, IconComponent, CurrencyPipe, CommonModule, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

  #store = inject(Store);
  dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);
  requestPiechart: RequestPieChart[] = [];
  chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      width: '100%',
      type: 'pie',
    },
    labels: [],
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


  constructor() {
    this.loadData();
  }

  private async loadData() {
    await Promise.all([
      firstValueFrom(this.#store.dispatch(new HomeAction.Get)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetRequestPieChart)),
    ]);

    this.dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);
    this.requestPiechart = this.#store.selectSnapshot(HomeSelectors.requestPieChart);
    this.requestPiechart.forEach(d => {
      this.chartOptions.series?.push(d.count);
      this.chartOptions.labels?.push(d._id);
    });

  }


}
