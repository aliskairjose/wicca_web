import { PaginationInterface, ParamsInterface } from "@shared/interfaces";

const ACTION_SCOPE = '[Common API]';

export namespace CommonAction {
  export class GetReviews {
    static readonly type = `${ACTION_SCOPE} List Reviews`;
    constructor(
      readonly params: ParamsInterface,
      readonly pagination: PaginationInterface
    ) { }
  }
}
