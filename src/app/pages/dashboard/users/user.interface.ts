import { RoleEnum, StatusEnum } from '@shared/enums';
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
  dob: Date;
  phone: string,
  country: string;
  language?: string[];
  isActive: boolean;
  connectStatus: ConnectStatusType;
  status?: StatusEnum;
  socketId?: string;
  lastConnect: Date;
  createdAt: Date;
  updatedAt: Date;
  wallet?: WalletInterface;
  rooms: RoomInterface[];
  payments?: any;
  reviews?: ReviewInterface[];
  rate?: RateInterface;
  advisor?: AdvisorInterface;
  requestLogs: RequestLogs[]
}

interface RequestLogs {
  status: string;
  createdAt: Date;
}
export interface AdvisorInterface {
  alias: string;
  chatPrice: number;
  callPrice: number;
  enabledCall: boolean;
  description: string;
  category: string;
  decription: string;
  experience: string;
  dniImage: string;
  dniID: string;
  dniType: string;
  videoIntro: string;
  videoIntroID: string;
}

export interface WalletInterface {
  balance: number;
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
