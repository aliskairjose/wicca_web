import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvatarComponent, IconComponent, BadgeComponent } from '@shared/components';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HomeSelectors } from './store/home.selectors';
import { firstValueFrom } from 'rxjs';
import { HomeAction } from './store/home.actions';
import { RequestPieChart } from './interfaces/request-pie-chart.interface';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
import { RouterLink } from '@angular/router';

type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent, IconComponent, CurrencyPipe, CommonModule, NgApexchartsModule, RouterLink, BadgeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

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


  ngOnInit() {
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
