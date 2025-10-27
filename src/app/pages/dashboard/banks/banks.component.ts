import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { BankSelectors } from './store/bank.selctors';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { firstValueFrom } from 'rxjs';
import { BankActions } from './store/bank.actions';
import { BankInterface } from './interfaces/bank.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { TableContainerComponent } from '@shared/components';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [TableContainerComponent],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss'
})
export class BanksComponent implements OnInit {

  #store = inject(Store);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  banks: BankInterface[] = [];
  metadata = signal<MetadataInterface | undefined>(undefined);

  ngOnInit(): void {
    const res = this.#store.selectSnapshot(BankSelectors.list);
    (res)
      ? this.setData(res)
      : this.dispatch();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.dispatch();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = new FormData();


    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      formData.set('file', file);

      await firstValueFrom(this.#store.dispatch(new BankActions.PostFile(formData)));
      await this.dispatch();
    }
  }

  setData(res: any): void {
    this.banks = res!.results;
    this.metadata.set(res!.metadata);
  }

  private dispatch() {
    this.#store.dispatch(new BankActions.List(this.queryParams, this.pagination)).subscribe(() => {
      const res = this.#store.selectSnapshot(BankSelectors.list);
      this.setData(res);
    });
  }
}
