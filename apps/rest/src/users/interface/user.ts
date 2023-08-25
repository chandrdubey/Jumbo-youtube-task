import { ObjectionModel } from '@libs/boat';
export interface User$Modal$Interface extends ObjectionModel {
  userName?: string;
  email?: string;
  password?: string;
  fullName?: string;
}
