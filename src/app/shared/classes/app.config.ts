import { environment } from "@envs/environment";

export class AppConfig {

  static APP_NAME = 'Orbe';
  static BASE_URL = environment.baseUrl;
  static SOCKET_URL = environment.baseUrl;


  static baseUrl = (slug: string): string => `${this.BASE_URL}/${slug}`;
}
