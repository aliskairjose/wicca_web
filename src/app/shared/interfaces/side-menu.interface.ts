import { RoleEnum } from "@shared/enums";

export interface SideMenuStateModel {
  items: SideMenuInterface[];
}

export interface SideMenuInterface {
  icon: string;
  title: string;
  path: string;
  role: [RoleEnum, RoleEnum?];
  children?: SideMenuInterface[]
}
