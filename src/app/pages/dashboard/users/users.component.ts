import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { DatePipe } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { StatusDirective } from '@shared/directives';
import { ButtonComponent } from '@shared/components';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, StatusDirective, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: UserInterface[] = [];
  #store = inject(Store);

  ngOnInit(): void {
    this.#store
      .dispatch(new UserAction.List())
      .subscribe(
        () => (this.users = this.#store.selectSnapshot(UserSelectors.list))
      );
  }
}
