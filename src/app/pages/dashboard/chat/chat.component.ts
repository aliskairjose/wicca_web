import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { PaginationInterface, ParamsInterface } from '@shared/interfaces';
import { RoomInterface } from './interfaces/room.interface';
import { MetadataInterface } from '@shared/interfaces/response.interface';
import { ChatActions } from './store/chat.actions';
import { ChatSelectors } from './store/chat.selectors';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent, ButtonComponent, ChatBurbleComponent, TableContainerComponent } from '@shared/components';
import { HSOverlay } from 'flyonui/flyonui';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableContainerComponent, ButtonComponent, ChatBurbleComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  pagination: PaginationInterface = {
    page: 1,
    limit: 20
  };
  queryParams: ParamsInterface = {};

  #store = inject(Store);


  rooms: RoomInterface[] = [];
  selectedRoom: RoomInterface | undefined;
  metadata = signal<MetadataInterface | undefined>(undefined);

  constructor() {
    this._getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    // this.getData()
  }

  async openModal(id: string) {
    await firstValueFrom(this.#store.dispatch(new ChatActions.Get(id)));
    this.selectedRoom = this.#store.selectSnapshot(ChatSelectors.selectedRoom)!;
    const modal = new HSOverlay(document.querySelector('#scroll-inside-modal')!);
    modal.open();
  }

  closeModal() {
    const modal = new HSOverlay(document.querySelector('#scroll-inside-modal')!);
    modal.close();
  }

  private async _getData() {
    await firstValueFrom(this.#store.dispatch(new ChatActions.List(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(ChatSelectors.roomList)!;
    this.rooms = results;
    this.metadata.set(metadata);
  }
}
