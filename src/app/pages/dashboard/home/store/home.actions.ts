const ACTION_SCOPE = '[Dashboard API]';

export namespace HomeAction {
  export class GetAccumulatedTime {
    static readonly type = `${ACTION_SCOPE} Get AccumulatedTime`;
    constructor(readonly id?: string) { }
  }
  export class GetUserSummary {
    static readonly type = `${ACTION_SCOPE} Get User Summary`;
  }
  export class GetSummaryStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Status`;
  }
  export class GetTopAdvisors {
    static readonly type = `${ACTION_SCOPE} Get Top Advisors`;
  }
  export class GetNewRegistrations {
    static readonly type = `${ACTION_SCOPE} Get New Registrations`;
  }
  export class GetSummaryMonthlyStatus {
    static readonly type = `${ACTION_SCOPE} Get Summary Monthly Status`;
    constructor(readonly year: number) { }
  }
}
