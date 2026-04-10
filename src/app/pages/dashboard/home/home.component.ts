import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { AvatarComponent, IconComponent, BadgeComponent, CircularChartComponent, ColumnChartComponent, InputComponent } from '@shared/components';
import { CommonModule, DatePipe, DOCUMENT } from '@angular/common';
import { HomeSelectors } from './store/home.selectors';
import { firstValueFrom } from 'rxjs';
import { HomeAction } from './store/home.actions';
import { RouterLink } from '@angular/router';
import { SummaryMonthlyStatusInterface, SummaryStatusInterface } from './interfaces/request-pie-chart.interface';
import { AccumulatedTimeInterface, UserSummaryInterface } from '../request-logs/interfaces/summary.interface';
import { TopRatedInterface } from './interfaces/top-rated.interface';
import { UserInterface } from '../users/user.interface';
import { RateExchangeInterface } from '@shared/interfaces';
import { RateExchangeService } from '@shared/services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HSOverlay } from 'flyonui/flyonui';
import { sign } from 'crypto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent, IconComponent, CommonModule, RouterLink, BadgeComponent, CircularChartComponent, ColumnChartComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  #fb = inject(FormBuilder);
  #store = inject(Store);
  #rateService = inject(RateExchangeService);

  summaryUser: UserSummaryInterface | undefined;
  series: number[] = [];
  labels: string[] = [];
  currentYear = new Date().getFullYear();
  accumulatedTime: AccumulatedTimeInterface[] = [];
  summaryMonthly: SummaryMonthlyStatusInterface[] = [];
  topRatedAdvisors: TopRatedInterface[] = [];
  newUsers: UserInterface[] = [];
  nominatedAdvisors: UserInterface[] = [];

  rate = signal<RateExchangeInterface | undefined>(undefined);
  isSubmited = signal(false);

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this._loadForm();
    this.loadData(this.currentYear);
    this.#rateService.get().subscribe((res) => {
      this.rate.set(res[0]);
    });
  }

  openModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#rate-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#rate-modal')!);
    this.isSubmited.set(false);
    this.form.reset();
    modal.close();
  }

  onSubmit(): void {
    this.isSubmited.set(true);
    if (this.form.valid) {
      const currentRate = this.form.value.currentRate;
      this.closeModal();
      this.#rateService.update(this.rate()!._id, { currentRate }).subscribe((res) => {
        this.rate.set(res);
      });
    }
  }


  private _loadForm(): void {
    this.form = this.#fb.group({
      currentRate: [0, [Validators.required]],
    });
  }

  private async loadData(year: number) {
    await Promise.all([
      firstValueFrom(this.#store.dispatch(new HomeAction.GetNominatedAdvisors)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetAccumulatedTime)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetNewRegistrations)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetTopAdvisors)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetUserSummary)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetSummaryStatus)),
      firstValueFrom(this.#store.dispatch(new HomeAction.GetSummaryMonthlyStatus(year))),
    ]);

    this.nominatedAdvisors = this.#store.selectSnapshot(HomeSelectors.nominatedAdvisors);

    this.newUsers = this.#store.selectSnapshot(HomeSelectors.newRegistrations);

    this.topRatedAdvisors = this.#store.selectSnapshot(HomeSelectors.topRatedAdvisors);

    this.accumulatedTime = this.#store.selectSnapshot(HomeSelectors.accumulatedTime);

    this.summaryUser = this.#store.selectSnapshot(HomeSelectors.summaryUser);

    const res = this.#store.selectSnapshot(HomeSelectors.summaryStatus);

    res.forEach((d: SummaryStatusInterface) => {
      this.series.push(d.count);
      this.labels.push(d._id);
    });

    this.summaryMonthly = this.#store.selectSnapshot(HomeSelectors.summaryMonthlyStatus);
  }


}
