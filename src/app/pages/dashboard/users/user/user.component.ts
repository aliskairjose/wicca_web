import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserAction } from '../store/user.actions';
import { UserSelectors } from '../store/user.selectors';
import { UserInterface } from '../user.interface';
import { firstValueFrom } from 'rxjs';
import { RoleEnum } from '@shared/enums';
import { IconComponent, AvatarComponent } from '@shared/components';
import { CommonModule } from '@angular/common';

const ConnStatus = {
  Online: 'online-top',
  Offline: 'busy-top',
  Busy: 'away-top',
  Away: 'offline-top',
};
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, IconComponent, AvatarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserComponent implements OnInit {
  role = RoleEnum;
  user: UserInterface | undefined;

  #route = inject(ActivatedRoute);
  #store = inject(Store);
  users: any[] = [];
  labels = ['Aceptados', 'Rechazados'];

  fullName = computed(() => `${this.user?.name} ${this.user?.lastName}`);
  statusClass = computed(() => `${ConnStatus[this.user!.connectStatus]}`)

  async ngOnInit() {
    const { id } = await firstValueFrom(this.#route.params);
    await firstValueFrom(this.#store.dispatch(new UserAction.Get(id)));
    this.user = this.#store.selectSnapshot(UserSelectors.selectedUser);
  }

  get totalEarnings() {
    return (this.user?.wallet?.balance ?? 0) * 0.4;
  }
}
