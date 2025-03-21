import { RoleEnum } from '@shared/enums';
import { RateInterface } from '@shared/interfaces';

export interface UserInterface {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
  role: RoleEnum;
  isActive: boolean;
  isOnline?: boolean;
  socketId?: string;
  lastConnect?: Date;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  info?: InfoInterface;
  wallet?: WalletInterface;
  rates: RateInterface[];
  payments?: any;
}

interface InfoInterface {
  title: string;
  prince: number;
  description: string;
  category: string;
}

interface WalletInterface {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
