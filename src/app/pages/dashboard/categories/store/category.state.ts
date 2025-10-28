import { ResponseInterface } from "@shared/interfaces";
import { CategoryInterface } from "../interfaces/category.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { CategoryAction } from "./category.action";
import { tap } from "rxjs";
import { CategoriesService } from "../categories.service";
import { CommonService } from "@shared/services/common.service";
import { Api } from "@shared/apis";

export interface CategoryStateModel {
  categories: ResponseInterface<CategoryInterface> | undefined;
  categoriesFullList: CategoryInterface[] | [];
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: undefined,
    categoriesFullList: []
  }
})
@Injectable()
export class CategoryState {
  #service = inject(CategoriesService);
  #commonService = inject(CommonService);

  @Action(CategoryAction.Get)
  get(ctx: StateContext<CategoryStateModel>, { id }: CategoryAction.Get) {

  }

  @Action(CategoryAction.Add)
  add(ctx: StateContext<CategoryStateModel>, { payload }: CategoryAction.Add) {
    return this.#service.create(payload);
  }

  @Action(CategoryAction.List)
  list(ctx: StateContext<CategoryStateModel>, { payload, pagination }: CategoryAction.List) {
    payload ??= {};
    return this.#service
      .list(payload, pagination)
      .pipe(
        tap((categories: ResponseInterface<CategoryInterface>) => ctx.patchState({ categories })
        )
      );
  }
  @Action(CategoryAction.ListNoPagination)
  listNoPagination(ctx: StateContext<CategoryStateModel>) {
    let state = ctx.getState();
    if (state.categoriesFullList.length) {
      return;
    }
    return this.#service
      .ListNoPagination()
      .pipe(
        tap((categoriesFullList: CategoryInterface[]) => ctx.patchState({ categoriesFullList })
        )
      );
  }

  @Action(CategoryAction.Update)
  update(ctx: StateContext<CategoryStateModel>, { id, payload }: CategoryAction.Update) {
    let state = ctx.getState();
    return this.#service
      .update(id, payload)
      .pipe(
        tap((category: CategoryInterface) => {
          const data: ResponseInterface<CategoryInterface> = {
            metadata: state.categories!.metadata,
            results: []
          }
          data.results = state.categories!.results.map(c => (c._id === id) ? category : c);
          ctx.patchState({ categories: data });
        })
      );
  }

  @Action(CategoryAction.Delete)
  delete(ctx: StateContext<CategoryStateModel>, { id }: CategoryAction.Delete) {
    let state = ctx.getState();
    return this.#service.delete(id);
  }

  @Action(CategoryAction.PostFile)
  masiveUpload(ctx: StateContext<CategoryStateModel>, { payload }: CategoryAction.PostFile) {
    return this.#commonService.masiveUpload(payload, Api.CategoryMasiveUpload);
  }
}
