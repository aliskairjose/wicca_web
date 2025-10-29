import { createPropertySelectors, createSelector } from '@ngxs/store';
import { CommonState, CommonStateModel } from './common.state';

export class CommonSelectors {
  private static getSlices = createPropertySelectors<CommonStateModel>(CommonState);

  static reviews = createSelector([CommonSelectors.getSlices.reviews], (reviews) => reviews);

}
