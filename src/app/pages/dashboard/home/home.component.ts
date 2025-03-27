import { Component, inject, OnInit } from '@angular/core';
import { TotalUsersInterface, UserInterface } from '../users/user.interface';
import { ResponseInterface } from '@shared/interfaces';
import { Store } from '@ngxs/store';
import { UserAction } from '../users/store/user.actions';
import { UserSelectors } from '../users/store/user.selectors';
import { AvatarComponent, IconComponent } from '@shared/components';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AvatarComponent, DatePipe, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  users: UserInterface[] = [];
  totalUsers: TotalUsersInterface | undefined;
  response!: ResponseInterface<UserInterface>;

  #store = inject(Store);

  ngOnInit(): void {
    this.#store.dispatch([new UserAction.List(), new UserAction.TotalUsers]).subscribe(() => {
      this.totalUsers = this.#store.selectSnapshot(UserSelectors.totalUsers);
      this.response = this.#store.selectSnapshot(UserSelectors.list)!;
      this.users = this.response.results;
    })
  }

}
