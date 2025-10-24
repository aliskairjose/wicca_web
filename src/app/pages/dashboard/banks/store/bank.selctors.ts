import { createPropertySelectors, createSelector } from "@ngxs/store"
import { BankState, BankStateModel } from "./bank.state"

export class BankSelectors {
  private static getSlices = createPropertySelectors<BankStateModel>(BankState);

  static list = createSelector(
    [BankSelectors.getSlices.banks],
    (banks) => banks
  )
}
