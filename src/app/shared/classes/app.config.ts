import { environmentDev } from "@envs/env.devs";

export class AppConfig {

  static APP_NAME = 'Orbe';
  static baseUrl = (slug: string): string => `${environmentDev.baseUrl}/${slug}`;
}
