import { PaginationInterface, ParamsInterface } from "@shared/interfaces";

const ACTION_SCOPE = '[Payments API]';

export namespace PaymentActions {
  export class List {
    static readonly type = `${ACTION_SCOPE} List`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface,
    ) { }
  }

}
