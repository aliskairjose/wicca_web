const ACTION_SCOPE = '[Dashboard API]';

export namespace HomeAction {
  export class GetUserSummary {
    static readonly type = `${ACTION_SCOPE} Get User Summary`;
  }
  export class GetSummaryStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Status`;
  }
  export class GetTopAdvisors {
    static readonly type = `${ACTION_SCOPE} Get Top Advisors`;
  }
  export class GetSummaryMonthlyStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Monthly Status`;
    constructor(readonly year: number) { }
  }
}
