import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule, DatePipe } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { StatusDirective } from '@shared/directives';
import { ButtonComponent, InputComponent } from '@shared/components';
import { debounce, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { FilterPipe } from '@shared/pipes';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, StatusDirective, ButtonComponent, FilterPipe, InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  searchForm!: FormGroup;
  query = signal('');
  users: UserInterface[] = [];
  #store = inject(Store);
  #fb = inject(FormBuilder);

  ngOnInit(): void {
    this._loadForm();
    this.getData();
    this.searchForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(({search}) => this.query.set(search));
  }

  async getData() {
    let params = new HttpParams();
    params.set('page', 1);
    params.set('limit', 10);

    await firstValueFrom(this.#store.dispatch(new UserAction.List(params)));
    this.users = this.#store.selectSnapshot(UserSelectors.list);
  }

  private _loadForm():void {
    this.searchForm = this.#fb.group({
      search:['']
    })
  }
}
