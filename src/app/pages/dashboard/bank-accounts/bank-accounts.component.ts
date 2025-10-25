import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { BankAccountInterface } from './interfaces/bank-accounts.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { BankAccountSelectors } from './store/bank-accounts.selectors';
import { BankAccountActions } from './store/bank-accounts.actions';
import { firstValueFrom } from 'rxjs';
import { InputComponent, TableContainerComponent } from '@shared/components';
import { HSOverlay } from 'flyonui/flyonui';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankInterface } from '../banks/interfaces/bank.interface';
import { BankSelectors } from '../banks/store/bank.selctors';
import { BankActions } from '../banks/store/bank.actions';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [TableContainerComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent implements OnInit {
  #store = inject(Store);
  #fb = inject(FormBuilder);
  form!: FormGroup;
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  banks = this.#store.selectSnapshot(BankSelectors.listFull);
  accounts: BankAccountInterface[] = [];
  metadata = signal<MetadataInterface | undefined>(undefined);
  isSubmited = signal(false);


  constructor(
    @Inject(DOCUMENT) private document: Document) {
    (this.banks.length === 0) && this._refreshBankList();
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.loadForm();
    this._getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.dispatch();
  }

  openModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#account-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#account-modal')!);
    modal.close();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = new FormData();


    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      formData.set('file', file);

      await firstValueFrom(this.#store.dispatch(new BankAccountActions.PostFile(formData)));
      await this.dispatch();
    }
  }

  private _refreshBankList(): void {
    this.#store.dispatch(new BankActions.ListFull({}, { limit: 0, page: 1 })).subscribe(() => {
      this.banks = this.#store.selectSnapshot(BankSelectors.listFull);
    })
  }

  private loadForm(): void {
    this.form = this.#fb.group({
      type: ['', [Validators.required]],
      number: ['', [Validators.required]],
      bank: ['', [Validators.required]],
    });
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
