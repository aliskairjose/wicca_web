const ACTION_SCOPE = '[Dashboard API]';

export namespace HomeAction {
  export class Get {
    static readonly type = `${ACTION_SCOPE} Get Dashboard`;
  }
  export class GetSummaryStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Status`;
  }
  export class GetSummaryMonthlyStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Monthly Status`;
    constructor(readonly year: number) { }
  }
}
