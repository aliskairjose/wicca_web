import { environmentDev } from "@envs/env.devs";

export class AppConfig {

  static APP_NAME = 'Orbe';
  static BASE_URL = environmentDev.baseUrl;
  static SOCKET_URL = environmentDev.baseUrl;


  static baseUrl = (slug: string): string => `${this.BASE_URL}/${slug}`;
}
