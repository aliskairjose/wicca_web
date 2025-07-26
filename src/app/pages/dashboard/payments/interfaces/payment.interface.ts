import { PaymentTypeEnum } from "../enums/payment-type.enum";

export interface PaymentInterface {
  _id: string;
  stripeId?: string;
  stripeUnixDate?: number;
  amount: number;
  currency: string;
  description: PaymentTypeEnum;
  createdAt: Date;
}
