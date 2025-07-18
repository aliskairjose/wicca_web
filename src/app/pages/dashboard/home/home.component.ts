import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvatarComponent, IconComponent, BadgeComponent, CircularChartComponent, ColumnChartComponent } from '@shared/components';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HomeSelectors } from './store/home.selectors';
import { firstValueFrom } from 'rxjs';
import { HomeAction } from './store/home.actions';
import { RouterLink } from '@angular/router';
import { SummaryMonthlyStatusInterface, SummaryStatusInterface } from './interfaces/request-pie-chart.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent, IconComponent, CurrencyPipe, CommonModule, RouterLink, BadgeComponent, CircularChartComponent, ColumnChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  #store = inject(Store);
  dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);
  series: number[] = [];
  labels: string[] = [];
  currentYear = new Date().getFullYear();
  summaryMonthly: SummaryMonthlyStatusInterface[] = [];


  ngOnInit() {
    this.loadData(this.currentYear);
  }

  private async loadData(year: number) {
    await Promise.all([
      firstValueFrom(this.#store.dispatch(new HomeAction.Get)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetSummaryStatus)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetSummaryMonthlyStatus(year))),
    ]);

    this.dashboard = this.#store.selectSnapshot(HomeSelectors.dashboard);
    const res = this.#store.selectSnapshot(HomeSelectors.summaryStatus);
    res.forEach((d: SummaryStatusInterface) => {
      this.series.push(d.count);
      this.labels.push(d._id);
    });
    this.summaryMonthly = this.#store.selectSnapshot(HomeSelectors.summaryMonthlyStatus);
    console.log(this.summaryMonthly)
  }


}
