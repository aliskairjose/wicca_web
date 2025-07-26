import { createPropertySelectors, createSelector } from "@ngxs/store";
import { PaymentState, PaymentStateModel } from "./payment.state";

export class PaymentSelectors {
  private static getSlices = createPropertySelectors<PaymentStateModel>(PaymentState);

  static payments = createSelector(
    [PaymentSelectors.getSlices.payments],
    (payments) => payments
  );

}
