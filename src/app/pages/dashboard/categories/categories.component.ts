import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { TableContainerComponent } from '@shared/components';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { CategoryInterface } from './interfaces/category.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { firstValueFrom } from 'rxjs';
import { CategoryAction } from './store/category.action';
import { CategorySelectors } from './store/category.selectors';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableContainerComponent, DatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};
  #store = inject(Store);

  categories = signal<CategoryInterface[] | undefined>(undefined);
  metadata = signal<MetadataInterface | undefined>(undefined);

  constructor() {
    this.getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }


  private async getData() {
    await firstValueFrom(this.#store.dispatch(new CategoryAction.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(CategorySelectors.list)!;
    this.categories.set(results);
    this.metadata.set(metadata);
  }
}
