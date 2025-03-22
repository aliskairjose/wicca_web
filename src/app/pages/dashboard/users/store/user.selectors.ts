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

  // static search(query: string) {
  //   query = Helper.deleteDiacriticosEs(query.trim().toLowerCase());
  //   return createSelector([UserSelectors.getSlices.users], (users) =>
  //     users.filter((u: UserInterface) => {
  //       const name = Helper.deleteDiacriticosEs(u.name);
  //       const lastName = Helper.deleteDiacriticosEs(u.lastName);
  //       return (
  //         name.toLowerCase().includes(query) ||
  //         lastName.toLowerCase().includes(query) ||
  //         u.email.toLowerCase().includes(query)
  //       );
  //     })
  //   );
  // }

  // static byRole(role: string) {
  //   return createSelector([UserSelectors.getSlices.users], (users) =>
  //     users.filter((u: any) => (role ? u.role === role : u))
  //   );
  // }

  // static byStatus(status: string | null) {
  //   return createSelector([UserSelectors.getSlices.users], (users) =>
  //     users.filter((u: any) => {
  //       if (status) {
  //         return status === 'activos' ? u.isActive : !u.isActive;
  //       }
  //       return u;
  //     })
  //   );
  // }
}
