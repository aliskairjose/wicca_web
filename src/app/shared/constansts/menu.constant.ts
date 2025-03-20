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
    title: 'Chats',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'report-money',
    path: 'payments',
    title: 'Pagos',
    role: [RoleEnum.Admin],
  },
];
