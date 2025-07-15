import { RoleEnum } from '@shared/enums';
import { RateInterface } from '@shared/interfaces';
import { ConnectStatusType } from '@shared/types';
import { RoomInterface } from '../chat/interfaces/room.interface';

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
  connectStatus: ConnectStatusType;
  socketId?: string;
  lastConnect: Date;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  wallet?: WalletInterface;
  rates: RateInterface[];
  rooms: RoomInterface[];
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
