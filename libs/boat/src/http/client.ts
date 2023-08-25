import axios, { Axios, AxiosRequestConfig } from 'axios';

export class HttpClient {
  client: Axios;
  constructor(private config: AxiosRequestConfig) {
    this.client = axios.create({ ...config });
  }

  async get(): Promise<void> {
    return;
  }

  async delete(): Promise<void> {
    return;
  }
  async head(): Promise<void> {
    return;
  }

  async options(): Promise<void> {
    return;
  }

  async post(): Promise<void> {
    return;
  }

  async put(): Promise<void> {
    return;
  }

  async patch(): Promise<void> {
    return;
  }
}
