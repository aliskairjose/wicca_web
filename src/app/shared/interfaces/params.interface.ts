import { RoleEnum } from "@shared/enums";

export interface ParamsInterface {
  [key: string]: string | boolean | RoleEnum;
}
