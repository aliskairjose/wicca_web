import { ResponseInterface } from "@shared/interfaces";
import { BankInterface } from "../interfaces/bank.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { BanksService } from "../banks.service";
import { BankActions } from "./bank.actions";
import { tap } from "rxjs";

export interface BankStateModel {
  banks: ResponseInterface<BankInterface> | undefined;
}

@State<BankStateModel>({
  name: 'banks',
  defaults: {
    banks: undefined,
  }
})
@Injectable()
export class BankState {
  #service = inject(BanksService);

  @Action(BankActions.List)
  bankList(
    ctx: StateContext<BankStateModel>,
    { payload, pagination }: BankActions.List,) {
    payload ??= {};
    return this.#service
      .banks(payload, pagination)
      .pipe(
        tap(
          (banks: ResponseInterface<BankInterface>) => ctx.patchState({ banks })
        )
      );
  }


  @Action(BankActions.PostFile)
  masiveUpload(ctx: StateContext<BankStateModel>, { payload }: BankActions.PostFile) {
    return this.#service.masiveUpload(payload);
  }
}
