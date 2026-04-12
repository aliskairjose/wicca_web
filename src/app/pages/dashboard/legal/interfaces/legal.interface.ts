import { LegalType } from "../types/legal.type";

export interface LegalInterface {
  _id: string;
  content: string;
  type: LegalType;
}
