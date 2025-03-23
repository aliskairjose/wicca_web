import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserAction } from '../store/user.actions';
import { UserSelectors } from '../store/user.selectors';
import { UserInterface } from '../user.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  user: UserInterface| undefined;

  #route = inject(ActivatedRoute);
  #store = inject(Store);

  constructor() {
  }

  async ngOnInit() {
    const params:Params = await firstValueFrom(this.#route.params);
    this.#store.dispatch(new UserAction.Get(params['id']))
    this.user = this.#store.selectSnapshot(UserSelectors.selectedUser)!;
    console.log(this.user);

  }
}
