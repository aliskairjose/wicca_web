import { RoleEnum } from '@shared/enums';
import { RateInterface } from '@shared/interfaces';

export interface UserInterface {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
  role: RoleEnum;
  title?: string;
  price?: number;
  rate?: number;
  description?: string;
  category?: string;
  language?: string[];
  isActive: boolean;
  isOnline?: boolean;
  socketId?: string;
  lastConnect?: Date;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  wallet?: WalletInterface;
  rates: RateInterface[];
  payments?: any;
}

interface WalletInterface {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TotalUsersInterface {
  totalUsers: number;
  totalAsesors: number;
  totalRegister: number;
  totalNewUsers: number;
}
