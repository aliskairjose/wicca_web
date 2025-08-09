import { ResponseInterface } from "@shared/interfaces";
import { CategoryInterface } from "../interfaces/category.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { inject, Injectable } from "@angular/core";
import { CategoriesService } from "../../categories.service";
import { CategoryAction } from "./category.action";
import { tap } from "rxjs";

export interface CategoryStateModel {
  categories: ResponseInterface<CategoryInterface> | undefined;
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: undefined,
  }
})
@Injectable()
export class CategoryState {
  #service = inject(CategoriesService);

  @Action(CategoryAction.Get)
  get(ctx: StateContext<CategoryStateModel>, { id }: CategoryAction.Get) {

  }

  @Action(CategoryAction.Add)
  add(ctx: StateContext<CategoryStateModel>, { payload }: CategoryAction.Add) {
    return this.#service.create(payload).pipe();
  }

  @Action(CategoryAction.List)
  list(ctx: StateContext<CategoryStateModel>, { payload, pagination }: CategoryAction.List) {
    payload ??= {};
    let state = ctx.getState();
    return this.#service
      .list(payload, pagination)
      .pipe(
        tap((categories: ResponseInterface<CategoryInterface>) => ctx.patchState({ categories })
        )
      );
  }

  @Action(CategoryAction.Update)
  update(ctx: StateContext<CategoryStateModel>, { id, payload }: CategoryAction.Update) {
    let state = ctx.getState();
    return this.#service
      .update(id, payload)
      .pipe(tap((user: CategoryInterface) => {
        const data: ResponseInterface<CategoryInterface> = {
          metadata: state.categories!.metadata,
          results: []
        }
        data.results = state.categories!.results.map(u => (u._id === id) ? user : u);
        ctx.patchState({ categories: data });
      })
      );
  }
}
