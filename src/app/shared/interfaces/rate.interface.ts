import { UserInterface } from "src/app/pages/dashboard/users/user.interface";

export interface RateInterface {
  rate: number;
  title: string;
  comment: string;
  createdAt: Date;
  user: UserInterface[];
  asesor: UserInterface[];
}
