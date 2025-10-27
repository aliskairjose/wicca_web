import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { BankAccountInterface } from './interfaces/bank-accounts.interface';
import { MetadataInterface, ResponseInterface } from '@shared/interfaces/response.interface';
import { BankAccountSelectors } from './store/bank-accounts.selectors';
import { BankAccountActions } from './store/bank-accounts.actions';
import { firstValueFrom } from 'rxjs';
import { InputComponent, SelectComponent, TableContainerComponent } from '@shared/components';
import { HSOverlay } from 'flyonui/flyonui';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankSelectors } from '../banks/store/bank.selctors';
import { BankActions } from '../banks/store/bank.actions';
import { UserInterface } from '../users/user.interface';
import { UserService } from '../users/services/user.service';
import { RoleEnum } from '@shared/enums';
import { OPTION_DATA } from '@shared/components/select/select.component';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [TableContainerComponent, ReactiveFormsModule, InputComponent, SelectComponent],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})
export class BankAccountsComponent implements OnInit {
  #store = inject(Store);
  #userService = inject(UserService);

  #fb = inject(FormBuilder);
  form!: FormGroup;
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  banks = this.#store.selectSnapshot(BankSelectors.listFull);
  snapShot: ResponseInterface<BankAccountInterface> | undefined = this.#store.selectSnapshot(BankAccountSelectors.list);
  accounts: BankAccountInterface[] = [];
  metadata = signal<MetadataInterface | undefined>(undefined);
  isSubmited = signal(false);
  advisors: OPTION_DATA[] = [];
  accountType: OPTION_DATA[] = [
    { val: 'Ahorro', title: 'Ahorro' },
    { val: 'Corriente', title: 'Corriente' },
  ]

  constructor(
    @Inject(DOCUMENT) private document: Document) {
    if (this.banks.length === 0) {
      this._refreshBankList();
    }
    (this.snapShot)
      ? this._setData()
      : this._dispatch();

    this._loadUsers()
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadForm();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this._dispatch();
  }

  openModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#account-modal')!);
    modal.open();
  }

  closeModal(): void {
    const modal = new HSOverlay(this.document.querySelector('#account-modal')!);
    modal.close();
  }

  onSubmit(): void {
    this.closeModal();
    this.isSubmited.set(true);
    this.#store.dispatch(new BankAccountActions.Post(this.form.value)).subscribe(() => this._dispatch());
    this._loadUsers();
  }

  onBankSelect({ value }: any): void {
    this.form.patchValue({ bank: value });
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const formData = new FormData();


    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      formData.set('file', file);

      this.#store.dispatch(new BankAccountActions.PostFile(formData)).subscribe(() => this._dispatch());

    }
  }

  private _loadUsers(): void {
    this.advisors = [];
    const query = { role: RoleEnum.Advisor, isActive: true, bankAccount: false };
    const pagination = { limit: 0, page: 1 };

    this.#userService.list(query, pagination).subscribe(res => {
      res.results.forEach((user: UserInterface) => {
        this.advisors.push({ val: user._id, title: `${user.name} ${user.lastName}` });
      })
    });
  }

  private _setData(): void {
    this.accounts = this.snapShot?.results!;
    this.metadata.set(this.snapShot?.metadata);
  }

  private _dispatch(): void {
    this.#store.dispatch(new BankAccountActions.List(this.queryParams, this.pagination)).subscribe(() => {
      this.snapShot = this.#store.selectSnapshot(BankAccountSelectors.list);
      this._setData();
    });
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
      user: ['', [Validators.required]]
    });
  }
}
