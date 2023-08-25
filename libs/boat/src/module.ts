import { Global, Module } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryModule } from '@nestjs/core';
import { ConsoleExplorer, DbOperationsCommand, ListCommands } from './console';
import { HttpProvider } from './http';
import { BaseModel } from './db';
import Knex from 'knex';
import * as KnexConfig from '../../../knexfile';
import { BoatConstants } from './constants';
import {
  BaseValidator,
  IsExistsConstraint,
  IsUniqueConstraint,
} from './validator';
import { Config } from './config';

BaseModel.knex(Knex(KnexConfig));

@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
  providers: [
    Config,
    DbOperationsCommand,
    ListCommands,
    ConsoleExplorer,
    BaseValidator,
    HttpProvider,
    {
      provide: BoatConstants.dbConnection,
      useFactory: async () => Knex(KnexConfig),
    },
    IsExistsConstraint,
    IsUniqueConstraint,
  ],
  exports: [
    Config,
    BaseValidator,
    {
      provide: BoatConstants.dbConnection,
      useFactory: async () => Knex(KnexConfig),
    },
  ],
})
export class BoatModule {}
