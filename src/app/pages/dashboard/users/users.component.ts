import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationInterface, ResponseInterface } from '@shared/interfaces';
import { PaginationType } from '@shared/types';
import { RoutesEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, InputComponent, PaginationComponent, SelectComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { LIMIT_PER_PAGE } from '@shared/constansts';
import { OPTION_DATA } from '@shared/components/select/select.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, ButtonComponent, StatusDirective, RouterLink, InputComponent, AvatarComponent, PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  #fb = inject(FormBuilder);
  term = '';

  itemsPerPage: OPTION_DATA[] = [
    { val: 5, title: '5' },
    { val: 10, title: '10' },
    { val: 20, title: '20' },
    { val: 50, title: '50' },
  ]

  #store = inject(Store);

  users: UserInterface[] = [];
  paginationOptions = signal<PaginationType | undefined>(undefined);
  routeEnum = RoutesEnum;

  pagination = signal<PaginationInterface>({
    limit: LIMIT_PER_PAGE,
    page: 1,
  });

  constructor() {
    this.setForm();
    const res = this.#store.selectSnapshot(UserSelectors.list);
    (res)
      ? this.setData(res)
      : this.getData();
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400)
    ).subscribe(res => {
      this.term = res.term;
      this.getData();
    })
  }

  async getData() {
    const payload = {
      pagination: this.pagination(),
      query: this.term
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

  private setForm(): void {
    this.form = this.#fb.group({
      term: ['']
    });
  }

  onPageChange(page: number): void {
    this.pagination.update(options => ({ ...options, page }));
    this.getData();
  }

  onChanteItemPerPage(limit: number): void {
    this.pagination.update(() => ({ limit, page: 1 }));
    this.getData();
  }
}
