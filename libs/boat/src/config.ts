import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  static service: ConfigService;

  constructor(service: ConfigService) {
    Config.service = service;
  }

  static get(key: string): any {
    return Config.service.get(key);
  }
}
