import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { CategoryInterface } from '../interfaces/category.interface';

const ACTION_SCOPE = '[Categories API]';
export namespace CategoryAction {
  export class Clear {
    static readonly type = `${ACTION_SCOPE} Clear user`;
  }
  export class Add {
    static readonly type = `${ACTION_SCOPE} Add category`;
    constructor(readonly payload: CategoryInterface) { }
  }
  export class List {
    static readonly type = `${ACTION_SCOPE} List categories`;
    constructor(
      readonly payload: ParamsInterface,
      readonly pagination: PaginationInterface
    ) { }
  }
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get category`;
    constructor(readonly id: string) { }
  }
  export class ListNoPagination {
    static readonly type = `${ACTION_SCOPE} List category no pagination`;
  }
  export class Update {
    static readonly type = `${ACTION_SCOPE} Update category`;
    constructor(readonly id: string, readonly payload: Partial<CategoryInterface>) { }
  }
  export class Delete {
    static readonly type = `${ACTION_SCOPE} Delete category`;
    constructor(readonly id: string) { }
  }
  export class PostFile {
    static readonly type = `${ACTION_SCOPE} Post file`;
    constructor(readonly payload: FormData) { }
  }
}
