const ACTION_SCOPE = '[Dashboard API]';

export namespace HomeAction {
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get Dashboard`;
  }
}
