import { UserInterface } from "../../users/user.interface";
import { PaymentTypeEnum } from "../enums/payment-type.enum";

export interface PaymentInterface {
  _id: string;
  user: Partial<UserInterface>;
  reference: string;
  amount: number;
  currency: string;
  paymentType: string;
  transactionType: string;
  createdAt: Date;
}
