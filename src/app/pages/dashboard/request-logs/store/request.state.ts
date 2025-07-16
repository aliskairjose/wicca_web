import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { RequestLogsActions } from "./request.action";
import { RequestLogsService } from "../request-logs.service";
import { tap } from "rxjs";
import { RequestLogInterface } from "../interfaces/request-logs.interface";
import { ResponseInterface } from "@shared/interfaces";

export interface RequestLogsStateModel {
  requests: ResponseInterface<RequestLogInterface> | undefined;
}

@State<RequestLogsStateModel>({
  name: 'requestLogs',
  defaults: {
    requests: undefined,
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
