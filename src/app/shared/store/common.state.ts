import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ResponseInterface, ReviewInterface } from "@shared/interfaces";
import { CommonService } from "@shared/services/common.service";
import { CommonAction } from "./common.actions";
import { tap } from "rxjs";

export interface CommonStateModel {
  reviews: ResponseInterface<ReviewInterface> | undefined;
}

@State<CommonStateModel>({
  name: 'common',
  defaults: {
    reviews: undefined,
  }
})

@Injectable()
export class CommonState {
  #service = inject(CommonService);

  @Action(CommonAction.GetReviews)
  getReviews(ctx: StateContext<CommonStateModel>, { params, pagination }: CommonAction.GetReviews) {
    params ??= {};
    return this.#service.reviews(params, pagination)
      .pipe(
        tap(
          (reviews: ResponseInterface<ReviewInterface>) => ctx.patchState({ reviews })
        )
      );
  }
}
