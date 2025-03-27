import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ResponseInterface } from '@shared/interfaces';
import { PaginationType } from '@shared/types';
import { RoutesEnum } from '@shared/enums';
import { TableComponent } from '@shared/components';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  headers = ['Usuario', 'Email', 'Usuario Tipo', 'Usuario desde', '']
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

  ngOnInit(): void {
    //   distinctUntilChanged(),
    //   debounceTime(500)
    // ).subscribe(({ search }) => {
    //   this.search.set(search)
    //   this.getData();
    // });
  }

  async getData() {
    const payload = {
      // pagination: this.pagination(),
      // query:this.search()
    }
    await firstValueFrom(this.#store.dispatch(new UserAction.List(payload)));
    const response = this.#store.selectSnapshot(UserSelectors.list)!;
    this.setData(response);
  }

  private setData(data: ResponseInterface<UserInterface>): void {
    const { results, ...options } = data;
    this.users = results;
    this.paginationOptions.set(options);
  }

  // onPageChange(page: number): void {
  //   this.pagination.update(options=>({...options, page}));
  //   this.getData();
  // }

  // onChanteItemPerPage(limit: number): void {
  //   this.pagination.update(() =>( {limit, page: 1}));
  //   this.getData();
  // }
}
