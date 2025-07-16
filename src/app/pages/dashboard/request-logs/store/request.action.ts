import { PaginationInterface, ParamsInterface } from "@shared/interfaces";

const ACTION_SCOPE = '[Request Logs API]';

export namespace RequestLogsActions {
  export class List {
    static readonly type = `${ACTION_SCOPE} List`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface,
    ) { }
  }

}
