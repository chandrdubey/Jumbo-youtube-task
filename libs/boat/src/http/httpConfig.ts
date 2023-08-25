import { AxiosRequestConfig } from 'axios';

export interface HttpClientConfiguration {
  default: string;
  clients: { [key: string]: AxiosRequestConfig };
}
