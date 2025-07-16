export interface RequestLogInterface {
  id: string;
  asesor: RequestUser;
  status: string;
  createdAt: Date;
}

interface RequestUser {
  _id: string;
  avatar: string;
  name: string;
  lastName: string;
  email: string;
}
