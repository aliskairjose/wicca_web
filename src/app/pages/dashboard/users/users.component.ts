import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  #store = inject(Store);

  ngOnInit (): void {
    console.log('OnInit')
    this.#store.dispatch(new UserAction.List());
  }
}
