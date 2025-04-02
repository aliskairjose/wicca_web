import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationInterface, ParamsInterface, ResponseInterface } from '@shared/interfaces';
import { RoutesEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, TableContainerComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { MetadataInterface } from '@shared/interfaces/response.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: ''
  };
  #store = inject(Store);

  users: UserInterface[] = [];
  metadata: MetadataInterface | undefined;
  routeEnum = RoutesEnum;

  constructor() {
    const res = this.#store.selectSnapshot(UserSelectors.list);
    (res)
      ? this.setData(res)
      : this.getData();
  }

  async getData() {
    await firstValueFrom(this.#store.dispatch(new UserAction.List(this.queryParams, this.pagination)));
    const response = this.#store.selectSnapshot(UserSelectors.list)!;
    this.setData(response);
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  private setData(data: ResponseInterface<UserInterface>): void {
    const { results, metadata } = data;
    this.users = results;
    this.metadata = metadata;
  }


}
