import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from './client';
import { HttpClientConfiguration } from './httpConfig';

@Injectable()
export class HttpProvider {
  protected clients: Record<string, any>;
  private config: HttpClientConfiguration;
  constructor(config: ConfigService) {
    const httpConfig = config.get<HttpClientConfiguration>('http');
    if (!httpConfig || !httpConfig?.clients || httpConfig?.clients.length < 1) {
      return;
    }
    this.config = httpConfig;
    this.clients = [];
    this.initializeClients(httpConfig);
  }

  initializeClients(config: HttpClientConfiguration) {
    for (const clientName in config.clients) {
      this.clients[clientName] = new HttpClient(config.clients[clientName]);
    }
  }
}
