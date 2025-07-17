export interface RequestByAsesorInterface {
  _id: string;
  totalRequests: number;
  accepted: number;
  rejected: number;
  asesor: RequestUser;
}

interface RequestUser {
  avatar: string;
  name: string;
  lastName: string;
  email: string;
}
