import { createPropertySelectors, createSelector } from "@ngxs/store"
import { ChatState, ChatStateModel } from "./chat.state"

export class ChatSelectors {
  private static getSlices = createPropertySelectors<ChatStateModel>(ChatState);

  static roomList = createSelector(
    [ChatSelectors.getSlices.rooms],
    (rooms) => rooms
  )

  static selectedRoom = createSelector(
    [ChatSelectors.getSlices.selectedRoom],
    (selectedRoom) => selectedRoom
  )
}
