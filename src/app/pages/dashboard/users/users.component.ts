import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule, DatePipe } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { StatusDirective } from '@shared/directives';
import { ButtonComponent, InputComponent, PaginationComponent } from '@shared/components';
import { debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationInterface, ResponseInterface } from '@shared/interfaces';
import { PaginationType } from '@shared/types';
import { LIMIT_PER_PAGE } from '@shared/constansts';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, StatusDirective, ButtonComponent, InputComponent, CommonModule, ReactiveFormsModule,PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  #store = inject(Store);
  #fb = inject(FormBuilder);
  pagination = signal<PaginationInterface>( {
    page: 1,
    limit: LIMIT_PER_PAGE
  });
  search = signal<string>('');
  users: UserInterface[] = [];
  paginationOptions = signal<PaginationType|undefined>(undefined);

  constructor(){
    const res = this.#store.selectSnapshot(UserSelectors.list);
    (res)
     ? this.setData(res)
      :this.getData();
  }

  ngOnInit(): void {
    this._loadForm();
    this.searchForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(({ search }) => {
      this.search.set(search)
      this.getData();
    });
  }

  async getData() {
    const payload = {
      pagination: this.pagination(),
      query:this.search()
    }
    await firstValueFrom(this.#store.dispatch(new UserAction.List(payload)));
    const response = this.#store.selectSnapshot(UserSelectors.list)!;
    this.setData(response);
  }

  private setData(data: ResponseInterface<UserInterface>) :void {
    const { results, ...options} = data;
    this.users = results;
    this.paginationOptions.set(options);
  }

  onPageChange(page: number): void {
    this.pagination.update(options=>({...options, page}));
    this.getData();
  }

  private _loadForm(): void {
    this.searchForm = this.#fb.group({
      search: ['']
    });
  }
}
