import { createPropertySelectors, createSelector } from "@ngxs/store";
import { HomeState, HomeStateModel } from "./home.state";

export class HomeSelectors {
  private static getSlice = createPropertySelectors<HomeStateModel>(HomeState);

  static dashboard = createSelector([HomeSelectors.getSlice.dashboard], (dashboard) => dashboard);
}
