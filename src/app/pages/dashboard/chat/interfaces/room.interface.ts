import { UserInterface } from "../../users/user.interface";
import { MessageInterface } from "./message.interface";

export interface RoomInterface {
  _id: string;
  name: string;
  messages: MessageInterface[];
  members: UserInterface[];
  createdAt: Date;
}
