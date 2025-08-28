import { createPropertySelectors, createSelector } from "@ngxs/store";
import { CategoryState, CategoryStateModel } from "./category.state";

export class CategorySelectors {
  private static getSlices = createPropertySelectors<CategoryStateModel>(CategoryState);

  static list = createSelector([CategorySelectors.getSlices.categories], (categories) => categories);
  static listNoPagination = createSelector([CategorySelectors.getSlices.categoriesFullList], (categoriesFullList) => categoriesFullList);
}
