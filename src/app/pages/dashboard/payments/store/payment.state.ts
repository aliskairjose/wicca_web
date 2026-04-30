import { ResponseInterface } from "@shared/interfaces";
import { PaymentInterface } from "../interfaces/payment.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { PaymentsService } from "../payments.service";
import { PaymentActions } from "./payment.action";
import { tap } from "rxjs";

export interface PaymentStateModel {
  payments: ResponseInterface<PaymentInterface> | undefined;
}

@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: undefined,
  },
})
@Injectable()
export class PaymentState {
  #service = inject(PaymentsService);

  @Action(PaymentActions.List)
  list(ctx: StateContext<PaymentStateModel>, { payload, pagination }: PaymentActions.List) {
    payload ??= {};
    return this.#service
      .list(payload, pagination)
      .pipe(
        tap(
          (payments: ResponseInterface<PaymentInterface>) => ctx.patchState({ payments })
        )
      );

  }
}
