import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationInterface, ResponseInterface } from '@shared/interfaces';
import { PaginationType } from '@shared/types';
import { RoutesEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, TableContainerComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { LIMIT_PER_PAGE } from '@shared/constansts';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  term = '';
  pagination!: PaginationInterface
  #store = inject(Store);

  users: UserInterface[] = [];
  paginationOptions = signal<PaginationType | undefined>(undefined);
  routeEnum = RoutesEnum;

  constructor() {
    const res = this.#store.selectSnapshot(UserSelectors.list);
    (res)
      ? this.setData(res)
      : this.getData();
  }

  async getData() {
    const payload = {
      pagination: this.pagination,
      query: this.term
    }
    await firstValueFrom(this.#store.dispatch(new UserAction.List(payload)));
    const response = this.#store.selectSnapshot(UserSelectors.list)!;
    this.setData(response);
  }

  onChangeTable(e: any): void {
    this.term = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  private setData(data: ResponseInterface<UserInterface>): void {
    const { results, ...options } = data;
    this.users = results;
    this.paginationOptions.set(options);
  }


}
