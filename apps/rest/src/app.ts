import { BoatModule } from '@libs/boat';
import { Module } from '@nestjs/common';
import { AuthApiModule } from './auth';
import { VideoModule } from './videos';

@Module({
  imports: [BoatModule, AuthApiModule, VideoModule],
  controllers: [],
  providers: [],
})
export class RestModule {}
