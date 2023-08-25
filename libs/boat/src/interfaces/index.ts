export * from './transformer';
export * from './db';

export interface ArgumentOptionObject {
  name: string;
  isRequired: boolean;
  isArray: boolean;
  defaultValue: string | boolean;
  expression: string;
}

export interface ArgumentParserOutput {
  name: string;
  arguments: ArgumentOptionObject[];
  options: ArgumentOptionObject[];
}
