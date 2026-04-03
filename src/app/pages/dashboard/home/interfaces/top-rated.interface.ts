import { AdvisorInterface } from "../../users/user.interface";

export interface TopRatedInterface {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  role: string;
  averageRating: number;
  advisor: AdvisorInterface;
}
