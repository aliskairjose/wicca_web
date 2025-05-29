import { UserInterface } from "../../users/user.interface";

export interface MessageInterface {
  _id: string;
  message: string;
  sender: UserInterface;
  createdAt: Date;
}
