import { Action, State, StateContext } from '@ngxs/store';
import { ResponseInterface } from '../../../../shared/interfaces/response.interface';
import { BankAccountInterface } from '../interfaces/bank-accounts.interface';
import { inject, Injectable } from '@angular/core';
import { BankAccountService } from '../../bankAccounts/bank-account.service';
import { BankAccountActions } from './bank-accounts.actions';
import { tap } from 'rxjs';

export interface BankAccountStateModel {
  accounts: ResponseInterface<BankAccountInterface> | undefined;
  selectedAccount: BankAccountInterface | undefined;
}

@State<BankAccountStateModel>({
  name: 'bankAccount',
  defaults: {
    accounts: undefined,
    selectedAccount: undefined
  }
})
@Injectable()
export class BankAccountState {
  #service = inject(BankAccountService);

  @Action(BankAccountActions.List)
  bankList(
    ctx: StateContext<BankAccountStateModel>,
    { payload, pagination }: BankAccountActions.List) {
    payload ??= {};
    return this.#service
      .list(payload, pagination)
      .pipe(
        tap(
          (accounts: ResponseInterface<BankAccountInterface>) => ctx.patchState({ accounts })
        )
      );
  }

}
