import { PaginationInterface, ParamsInterface } from "@shared/interfaces";

const ACTION_SCOPE = '[Chats API]';

export namespace ChatActions {
  export class List {
    static readonly type = `${ACTION_SCOPE} List Room`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface,
    ) { }
  }
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get room`;
    constructor(readonly id: string) { }
  }

}
