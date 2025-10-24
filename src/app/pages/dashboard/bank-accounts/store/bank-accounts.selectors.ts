
import { createPropertySelectors, createSelector } from "@ngxs/store"
import { BankAccountState, BankAccountStateModel } from "./bank-accounts.state";

export class BankAccountSelectors {
  private static getSlices = createPropertySelectors<BankAccountStateModel>(BankAccountState);

  static list = createSelector(
    [BankAccountSelectors.getSlices.accounts],
    (accounts) => accounts
  )

  static selected = createSelector(
    [BankAccountSelectors.getSlices.selectedAccount],
    (account) => account
  )
}
