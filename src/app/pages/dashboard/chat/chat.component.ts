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
import { TableContainerComponent } from '@shared/components';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableContainerComponent],
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
  metadata = signal<MetadataInterface | undefined>(undefined);

  constructor() {
    this._getData();
  }

  onChangeTable(e: any): void {
    this.queryParams['search'] = e.term;
    this.pagination = e.pagination();
    // this.getData()
  }

  private async _getData() {

    await firstValueFrom(this.#store.dispatch(new ChatActions.RoomList(this.queryParams, this.pagination)));
    const { results, metadata } = this.#store.selectSnapshot(ChatSelectors.roomList)!;
    this.rooms = results;
    this.metadata.set(metadata);
  }
}
