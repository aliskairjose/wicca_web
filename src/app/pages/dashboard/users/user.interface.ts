import { RoleEnum } from '@shared/enums';
import { ReviewInterface } from '@shared/interfaces';
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
  reviews?: ReviewInterface[];
  rate?: RateInterface;
  advisor?: Advisor;
  requestLogs: RequestLogs[]
}

interface RequestLogs {
  status: string;
  createdAt: Date;
}
interface Advisor {
  callPrice: number;
  category: string;
  chatPrice: number;
  description: string;
  enabledCall: boolean;
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

export interface RateInterface {
  average: number;
  fiveStars: number;
  fourStars: number;
  oneStars: number;
  reviews: ReviewInterface[];
  threeStars: number;
  twoStars: number;
}
