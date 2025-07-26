import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { PaymentInterface } from './interfaces/payment.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { PaymentActions } from './store/payment.action';
import { firstValueFrom } from 'rxjs';
import { PaymentSelectors } from './store/payment.selector';
import { AvatarComponent, TableContainerComponent } from '@shared/components';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [TableContainerComponent, AvatarComponent, CurrencyPipe, DatePipe],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: ''
  };
  #store = inject(Store);

  payments = signal<PaymentInterface[] | undefined>(undefined);
  metadata = signal<MetadataInterface | undefined>(undefined);

  constructor() {
    this.getData();
  }

  private async getData() {
    await firstValueFrom(this.#store.dispatch(new PaymentActions.List(this.queryParams, this.pagination)));

    const { results, metadata } = this.#store.selectSnapshot(PaymentSelectors.payments)!;
    this.payments.set(results);
    this.metadata.set(metadata);

  }

}
