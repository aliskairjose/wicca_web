import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserAction } from '../store/user.actions';
import { UserSelectors } from '../store/user.selectors';
import { UserInterface } from '../user.interface';
import { firstValueFrom } from 'rxjs';
import { Helper } from '@shared/helpers';
import { RoleEnum } from '@shared/enums';
import { IconComponent, AvatarComponent } from '@shared/components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, IconComponent, AvatarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  role = RoleEnum;
  user = signal<UserInterface | undefined>(undefined)

  #route = inject(ActivatedRoute);
  #store = inject(Store);
  users: any[] = [];

  rates = computed(() => Helper.calculateRate(this.user()!.rates));
  fullName = computed(() => `${this.user()?.name} ${this.user()?.lastName}`);

  async ngOnInit() {
    const params: Params = await firstValueFrom(this.#route.params);
    await firstValueFrom(this.#store.dispatch(new UserAction.Get(params['id'])));
    this.user.set(this.#store.selectSnapshot(UserSelectors.selectedUser));
  }
}
