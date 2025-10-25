
import { PaginationInterface, ParamsInterface } from "@shared/interfaces";
import { BankAccountInterface } from "../interfaces/bank-accounts.interface";

const ACTION_SCOPE = '[BankAccount API]';

export namespace BankAccountActions {
  export class List {
    static readonly type = `${ACTION_SCOPE} List Bank`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface,
    ) { }
  }

  export class Get {
    static readonly type = `${ACTION_SCOPE} Get Bank Account`;
    constructor(readonly id: string) { }
  }

  export class PostFile {
    static readonly type = `${ACTION_SCOPE} Post file`;
    constructor(readonly payload: FormData) { }
  }

  export class Post {
    static readonly type = `${ACTION_SCOPE} Post Bank Account`;
    constructor(readonly payload: Omit<BankAccountInterface, '_id'>) { }
  }
}
