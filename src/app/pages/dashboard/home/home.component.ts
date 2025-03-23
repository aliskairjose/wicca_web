import { Component, inject, OnInit } from '@angular/core';
import { UserInterface } from '../users/user.interface';
import { PaginationInterface } from '@shared/interfaces';
import { Store } from '@ngxs/store';
import { UsersState } from '../users/store/user.state';
import { UserAction } from '../users/store/user.actions';
import { UserSelectors } from '../users/store/user.selectors';
import { AvatarComponent } from '@shared/components';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  users: UserInterface[] = []

  #store = inject(Store);

  ngOnInit(): void {
      this.#store.dispatch(new UserAction.List()).subscribe(() => {
        const res = this.#store.selectSnapshot(UserSelectors.list);
        this.users = res!.results;
      })
  }
}
