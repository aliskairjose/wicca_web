import { createPropertySelectors, createSelector } from "@ngxs/store";
import { HomeState, HomeStateModel } from "./home.state";

export class HomeSelectors {
  private static getSlice = createPropertySelectors<HomeStateModel>(HomeState);

  static topRatedAdvisors = createSelector([HomeSelectors.getSlice.topRatedAdvisors], (topRatedAdvisors) => topRatedAdvisors);

  static summaryUser = createSelector([HomeSelectors.getSlice.summaryUser], (summaryUser) => summaryUser);

  static accumulatedTime = createSelector([HomeSelectors.getSlice.accumulatedTime], (accumulatedTime) => accumulatedTime);

  static newRegistrations = createSelector([HomeSelectors.getSlice.newRegistrations], (newRegistrations) => newRegistrations);

  static summaryStatus = createSelector([HomeSelectors.getSlice.summaryStatus], (summaryStatus) => summaryStatus);

  static summaryMonthlyStatus = createSelector([HomeSelectors.getSlice.summaryMonthlyStatus], (summaryMonthlyStatus) => summaryMonthlyStatus);
}
