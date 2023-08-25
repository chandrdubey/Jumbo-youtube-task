import { GenericFunction } from '../constants';

export interface LoadRelOptions {
  [key: string]: any;
}
export interface Pagination<T> {
  data: T[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    perPage: number;
    total: number;
  };
}

export interface SortableSchema {
  sort?: string;
}

export interface ObjectionModel {
  id?: number;
  uuid?: string;
  createdAt?: Date;
  updatedAt?: Date;
  $fetchGraph?: GenericFunction;
  $load?(exp: LoadRelSchema, options?: LoadRelOptions): Promise<void>;
}
export interface NestedLoadRelSchema {
  $recursive?: boolean | number;
  $relation?: string;
  $modify?: string[];
  [key: string]: boolean | number | string | string[] | NestedLoadRelSchema;
}

export interface LoadRelSchema {
  [key: string]: boolean | NestedLoadRelSchema;
}
