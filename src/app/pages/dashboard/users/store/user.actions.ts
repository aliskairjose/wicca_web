import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { UserInterface } from '../user.interface';

const ACTION_SCOPE = '[Users API]';
export namespace UserAction {
  export class Clear {
    static readonly type = `${ACTION_SCOPE} Clear user`;
  }
  export class Add {
    static readonly type = `${ACTION_SCOPE} Add user`;
    constructor(readonly payload: UserInterface) {}
  }
  export class List {
    static readonly type = `${ACTION_SCOPE} List users`;
    constructor( readonly payload?: ParamsInterface) {}
  }
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get user`;
    constructor(readonly id: string) {}
  }
  export class Delete {
    static readonly type = `${ACTION_SCOPE} Delete users`;
    constructor(readonly id: string) {}
  }
  export class Update {
    static readonly type = `${ACTION_SCOPE} Update users`;
    constructor(readonly id: string, readonly payload: UserInterface) {}
  }
}
