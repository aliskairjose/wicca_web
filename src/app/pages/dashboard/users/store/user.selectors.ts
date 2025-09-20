import { createPropertySelectors, createSelector } from '@ngxs/store';
import { UsersState, UsersStateModel } from './user.state';
import { UserInterface } from '../user.interface';

export class UserSelectors {
  private static getSlices =
    createPropertySelectors<UsersStateModel>(UsersState);

  static list = createSelector(
    [UserSelectors.getSlices.users],
    (users) => users
  );
  static newUser = createSelector(
    [UserSelectors.getSlices.newUser],
    (newUser) => newUser
  );

  static selectedUser = createSelector([UserSelectors.getSlices.selectedUser], (selectedUser) => selectedUser);

  static selectedAdvisor = createSelector([UserSelectors.getSlices.selectedAdvisor], (selectedAdvisor) => selectedAdvisor);

  static monthlyTimeAccumulated = createSelector([UserSelectors.getSlices.monthlyTimeAccumulated], (monthlyTimeAccumulated) => monthlyTimeAccumulated);
}
