import { createPropertySelectors, createSelector } from '@ngxs/store';
import { UsersState, UsersStateModel } from './user.state';
import { Helper } from '@shared/helpers';
import { UserInterface } from '../user.interface';

export class UserSelectors {
  private static getSlices =
    createPropertySelectors<UsersStateModel>(UsersState);

  static list = createSelector(
    [UserSelectors.getSlices.users],
    (users) => users
  );

  static latestRegistered = createSelector(
    [UserSelectors.getSlices.users],
    (users: UserInterface[]) => users.slice(0, 11)
  );

  static selectedUser = createSelector([UserSelectors.getSlices.selectedUser], (selectedUser) => selectedUser);
}
