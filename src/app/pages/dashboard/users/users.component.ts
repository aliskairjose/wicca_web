import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserInterface } from './user.interface';
import { UserAction } from './store/user.actions';
import { CommonModule } from '@angular/common';
import { UserSelectors } from './store/user.selectors';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { ConnectStatusEnum, RoutesEnum } from '@shared/enums';
import { AvatarComponent, ButtonComponent, TableContainerComponent } from '@shared/components';
import { StatusDirective } from '@shared/directives';
import { RouterLink } from '@angular/router';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { HSOverlay } from 'flyonui/flyonui';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, StatusDirective, RouterLink, AvatarComponent, TableContainerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {
    search: ''
  };
  #store = inject(Store);

  // users: UserInterface[] = [];
  users = signal<UserInterface[] | undefined>(undefined);
  modalUser: UserInterface | undefined;
  metadata = signal<MetadataInterface | undefined>(undefined);
  routeEnum = RoutesEnum;


  constructor() {
    this.getData();
  }

  onChangeTable(e: any): void {
    console.log('onChange', e.pagination())
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    this.getData()
  }

  async openModal(user: UserInterface) {
    this.modalUser = user;
    const modal = new HSOverlay(document.querySelector('#basic-modal')!);
    modal.open();
  }

  async closeModal(res: boolean) {
    const modal = new HSOverlay(document.querySelector('#basic-modal')!);
    modal.close();
    (res) && this.changeUserStatus(this.modalUser!);
    this.modalUser = undefined;
  }

  private changeUserStatus(user: UserInterface): void {
    const _user: Partial<UserInterface> = {
      isActive: !user.isActive,
      connectStatus: user.isActive ? ConnectStatusEnum.Away : ConnectStatusEnum.Offline
    };

    this.update(user._id, _user);
  }

  private async update(id: string, payload: Partial<UserInterface>) {
    await firstValueFrom(this.#store.dispatch(new UserAction.Update(id, payload)));
    const { results, metadata } = this.#store.selectSnapshot(UserSelectors.list)!;
    this.users.set([]);
    setTimeout(() => this.users.set(results), 100);
    this.metadata.set(metadata);
  }

  private async getData() {
    console.log('getData')
    await firstValueFrom(this.#store.dispatch(new UserAction.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(UserSelectors.list)!;
    this.users.set(results);
    this.metadata.set(metadata);
  }


}
