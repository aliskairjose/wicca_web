import { RoleEnum } from '@shared/enums';
import { SideMenuInterface } from '@shared/interfaces';

export const MENU: SideMenuInterface[] = [
  {
    icon: 'layout-dashboard',
    path: '.',
    title: 'Dashboard',
    role: [RoleEnum.Admin, RoleEnum.Advisor],
  },
  {
    icon: 'users',
    path: 'users',
    title: 'Usuarios',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'brand-wechat',
    path: 'chats',
    title: 'Chats',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'category',
    path: 'categories',
    title: 'Categorías',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'logs',
    path: 'request-logs',
    title: 'Histórico de solicitudes',
    role: [RoleEnum.Admin],
  },
  {
    icon: 'report-money',
    path: 'payments',
    title: 'Pagos',
    role: [RoleEnum.Admin],
  },
];
