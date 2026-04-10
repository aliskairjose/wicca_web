import { ResponseInterface } from "@shared/interfaces";
import { BankInterface } from "../interfaces/bank.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { BanksService } from "../banks.service";
import { BankActions } from "./bank.actions";
import { tap } from "rxjs";
import { CommonService } from "@shared/services/common.service";
import { Api } from "@shared/apis";

export interface BankStateModel {
  banks: ResponseInterface<BankInterface> | undefined;
  banksFull: BankInterface[] | []
}

@State<BankStateModel>({
  name: 'banks',
  defaults: {
    banks: undefined,
    banksFull: []
  }
})
@Injectable()
export class BankState {
  #service = inject(BanksService);
  #commonService = inject(CommonService);

  @Action(BankActions.List)
  bankList(
    ctx: StateContext<BankStateModel>,
    { payload, pagination }: BankActions.List) {
    payload ??= {};
    return this.#service
      .banks(payload, pagination)
      .pipe(
        tap(
          (banks: ResponseInterface<BankInterface>) => ctx.patchState({ banks })
        )
      );
  }

  @Action(BankActions.ListFull)
  bankListFull(
    ctx: StateContext<BankStateModel>,
    { payload, pagination }: BankActions.ListFull) {
    payload ??= {};
    return this.#service
      .banks(payload, pagination)
      .pipe(
        tap(
          (res: ResponseInterface<BankInterface>) => ctx.patchState({ banksFull: res.results })
        )
      );
  }


  @Action(BankActions.PostFile)
  masiveUpload(ctx: StateContext<BankStateModel>, { payload }: BankActions.PostFile) {
    return this.#commonService.masiveUpload(payload, Api.BankMasiveUpload);
  }
}
