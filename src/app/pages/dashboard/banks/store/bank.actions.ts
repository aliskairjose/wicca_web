import { PaginationInterface, ParamsInterface } from "@shared/interfaces";

const ACTION_SCOPE = '[Bank API]';

export namespace BankActions {
  export class List {
    static readonly type = `${ACTION_SCOPE} List Bank`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface,
    ) { }
  }

  export class Get {
    static readonly type = `${ACTION_SCOPE} Get bank`;
    constructor(readonly id: string) { }
  }

  export class PostFile {
    static readonly type = `${ACTION_SCOPE} Post file`;
    constructor(readonly payload: FormData) { }
  }

}
