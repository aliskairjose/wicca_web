import { createPropertySelectors, createSelector } from "@ngxs/store"
import { RequestLogsState, RequestLogsStateModel } from "./request.state";

export class RequestLogsSelectors {
  private static getSlices = createPropertySelectors<RequestLogsStateModel>(RequestLogsState);

  static list = createSelector(
    [RequestLogsSelectors.getSlices.requests],
    (requests) => requests
  )


}
