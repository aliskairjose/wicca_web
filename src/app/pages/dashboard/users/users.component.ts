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

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, StatusDirective, ButtonComponent, InputComponent, CommonModule, ReactiveFormsModule,PaginationComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  query = signal('');
  #store = inject(Store);
  #fb = inject(FormBuilder);
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  }
  search = '';
  response: ResponseInterface<UserInterface> | undefined;

  ngOnInit(): void {
    this._loadForm();
    this.getData();
    this.searchForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe(({ search }) => {
      this.search = search
      this.getData();
    });
  }

  async getData() {
    await firstValueFrom(this.#store.dispatch(new UserAction.List(this.search, this.pagination)));
    this.response = this.#store.selectSnapshot(UserSelectors.list);
  }

  private _loadForm(): void {
    this.searchForm = this.#fb.group({
      search: ['']
    })
  }
}
