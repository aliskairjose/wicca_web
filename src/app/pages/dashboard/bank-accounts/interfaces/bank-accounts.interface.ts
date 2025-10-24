import { BankInterface } from "../../banks/interfaces/bank.interface";
import { UserInterface } from "../../users/user.interface";

export interface BankAccountInterface {
  _id: string;
  type: string;
  number: string;
  bank: BankInterface;
  user: UserInterface;
}
