const ACTION_SCOPE = '[Auth]';

export namespace AuthActions {
  export class Login {
    static readonly type = `${ACTION_SCOPE} Login`;
    constructor(public payload: { email: string; password: string }) {}
  }

  export class Logout {
    static readonly type = `${ACTION_SCOPE} Logout`;
  }

  export class Register {
    static readonly type = `${ACTION_SCOPE} Register`;
    constructor(public payload: any) {}
  }
}
