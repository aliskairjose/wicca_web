import { RoleEnum } from "@shared/enums";

export interface UserSummaryInterface {
  roleSummary: RoleSummary;
  currentMonthRegisteredUsers: number;
  totalRegisteredUsers: number;
}

export interface RoleSummary {
  User: number;
  Admin: number;
  Advisor: number;
}

export interface AccumulatedTimeInterface {
  name: string;
  data: number[];
}
