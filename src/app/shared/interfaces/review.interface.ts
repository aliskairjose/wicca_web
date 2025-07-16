import { UserInterface } from "src/app/pages/dashboard/users/user.interface";

export interface ReviewInterface {
  rate: number;
  title: string;
  comment: string;
  createdAt: Date;
  reviewedBy: ReviwedUser;
  reviewedTo: ReviwedUser;
}
interface ReviwedUser {
  name: string;
  lastName: string;
  avatar: string;
}
