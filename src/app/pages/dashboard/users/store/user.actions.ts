import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { AdvisorInterface, UserInterface } from '../user.interface';

const ACTION_SCOPE = '[Users API]';
export namespace UserAction {
  export class Clear {
    static readonly type = `${ACTION_SCOPE} Clear user`;
  }
  export class Create {
    static readonly type = `${ACTION_SCOPE} Create user`;
    constructor(readonly payload: Partial<UserInterface>) { }
  }
  export class CreateAdvisorInfo {
    static readonly type = `${ACTION_SCOPE} Create advisor info`;
    constructor(readonly payload: AdvisorInterface) { }
  }
  export class List {
    static readonly type = `${ACTION_SCOPE} List users`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface
    ) { }
  }
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get user`;
    constructor(readonly id: string) { }
  }

  export class Update {
    static readonly type = `${ACTION_SCOPE} Update user`;
    constructor(readonly id: string, readonly payload: Partial<UserInterface>) { }
  }
  export class UpdateStatus {
    static readonly type = `${ACTION_SCOPE} Update user status`;
    constructor(readonly id: string, readonly payload: Partial<UserInterface>) { }
  }
  export class GetMonthlyTimeAccumulated {
    static readonly type = `${ACTION_SCOPE} Get monthly time accumulated`;
    constructor(readonly id: string) { }
  }
}
