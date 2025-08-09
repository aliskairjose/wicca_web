import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { RequestLogsActions } from "./request.action";
import { RequestLogsService } from "../request-logs.service";
import { tap } from "rxjs";
import { RequestByAsesorInterface } from "../interfaces/request-logs.interface";

export interface RequestLogsStateModel {
  requests: RequestByAsesorInterface[] | [];
}

@State<RequestLogsStateModel>({
  name: 'requestLogs',
  defaults: {
    requests: [],
  }
})

@Injectable()
export class RequestLogsState {
  #service = inject(RequestLogsService);

  @Action(RequestLogsActions.List)
  list(ctx: StateContext<RequestLogsStateModel>, { payload, pagination }: RequestLogsActions.List) {
    payload ??= {};

    return this.#service
      .list(payload, pagination)
      .pipe(
        tap((requests: any) => ctx.patchState({ requests })
        )
      );
  }


}
