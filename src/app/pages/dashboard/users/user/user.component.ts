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
import { ResponseInterface, ReviewInterface } from '@shared/interfaces';
import { CommonSelectors } from '@shared/store/common.selectors';
import { CommonAction } from '@shared/store/common.actions';

const ConnStatus = {
  Online: 'online-top',
  Offline: 'busy-top',
  Busy: 'away-top',
  Away: 'offline-top',
};
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
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
  statusClass = computed(() => `${ConnStatus[this.user!.connectStatus]}`);
  reviews: ResponseInterface<ReviewInterface> | undefined = this.#store.selectSnapshot(CommonSelectors.reviews);


  async ngOnInit() {
    this._getData();
  }

  get totalEarnings() {
    return (this.user?.wallet?.balance ?? 0) * 0.4;
  }

  private async _getData() {
    const params: Params = await firstValueFrom(this.#route.params);
    this.#store.dispatch([
      new UserAction.Get(params['id']),
      new CommonAction.GetReviews({ reviewedBy: params['id'] }, { limit: 0, page: 1 })
    ]).subscribe(() => {
      this.user = this.#store.selectSnapshot(UserSelectors.selectedUser);
      this.reviews = this.#store.selectSnapshot(CommonSelectors.reviews);
    });
  }
}
