import { UserInterface } from "../../users/user.interface";

export interface DashboardInterface {
  totalUsers: number;
  totalAsesors: number;
  totalRegister: number;
  totalNewUsers: number;
  newUsers: UserInterface[];
  topAsesors: UserInterface[];
}
