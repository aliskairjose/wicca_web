import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { BankAccountInterface } from './interfaces/bank-accounts.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { BankAccountSelectors } from './store/bank-accounts.selectors';
import { BankAccountActions } from './store/bank-accounts.actions';
import { firstValueFrom } from 'rxjs';
import { TableContainerComponent } from '@shared/components';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [TableContainerComponent],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent implements OnInit {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  accounts: BankAccountInterface[] = [];
  metadata = signal<MetadataInterface | undefined>(undefined);

  #store = inject(Store);

  ngOnInit(): void {
    this._getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.dispatch();
  }


  private _getData(): void {
    this.#store.selectOnce(BankAccountSelectors.list).subscribe(data => {
      if (!data) { this.dispatch() } else {
        this.accounts = data!.results;
        this.metadata.set(data!.metadata);
      };

    });
  }

  private async dispatch() {
    await firstValueFrom(this.#store.dispatch(new BankAccountActions.List(this.queryParams, this.pagination)));
    this._getData();
  }

}
