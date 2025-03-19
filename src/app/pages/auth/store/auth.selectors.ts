import { createPropertySelectors, createSelector } from '@ngxs/store';
import { AuthStateModel } from './auth.model';
import { AuthState } from './auth.state';

export class AuthSelectors {
  private static getSlices = createPropertySelectors<AuthStateModel>(AuthState);

  static token = createSelector(
    [AuthSelectors.getSlices.token],
    (token) => token
  );

  static isAuthenticated = createSelector(
    [AuthSelectors.getSlices.token],
    (token) => !!token
  );

  static userLogged = createSelector(
    [AuthSelectors.getSlices.user],
    (user) => user
  );

  static userRole = createSelector(
    [AuthSelectors.getSlices.user],
    (user) => user?.role
  );
}
