import { RoleEnum } from '@shared/enums';
import { SideMenuInterface } from '@shared/interfaces';

export const MENU: SideMenuInterface[] = [
  {
    icon: 'layout-dashboard',
    path: '.',
    title: 'Dashboard',
    role: [RoleEnum.Admin, RoleEnum.Asesor],
  },
  {
    icon: 'users',
    path: 'users',
    title: 'Usuarios',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'report-money',
    path: 'payments',
    title: 'Histórico de chats',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'report-money',
    path: 'payments',
    title: 'Histórico de pagos',
    role: [RoleEnum.Admin],
  },
];
