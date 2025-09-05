import { ResponseInterface } from "@shared/interfaces";
import { RoomInterface } from "../interfaces/room.interface";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatActions } from './chat.actions';
import { tap } from "rxjs";

export interface ChatStateModel {
  rooms: ResponseInterface<RoomInterface> | undefined;
  selectedRoom: RoomInterface | undefined;
}

@State<ChatStateModel>({
  name: 'chats',
  defaults: {
    rooms: undefined,
    selectedRoom: undefined,
  }
})
@Injectable()
export class ChatState {
  #chatService = inject(ChatService);

  @Action(ChatActions.List)
  roomList(
    ctx: StateContext<ChatStateModel>,
    { payload, pagination }: ChatActions.List,
  ) {
    const state = ctx.getState();
    payload ??= {};
    return this.#chatService
      .rooms(payload, pagination)
      .pipe(
        tap(
          (rooms: ResponseInterface<RoomInterface>) => ctx.patchState({ rooms })
        )
      );
  }

  @Action(ChatActions.Get)
  getRoom(ctx: StateContext<ChatStateModel>, { id }: ChatActions.Get) {
    const state = ctx.getState();
    return (state.selectedRoom?._id === id)
      ? ctx
      : this.#chatService
        .roomById(id)
        .pipe(
          tap(
            (selectedRoom: RoomInterface) => ctx.patchState({ selectedRoom })
          )
        );
  }

}
