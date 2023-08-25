import { Module } from '@nestjs/common';
import { LocalService, Services } from './services';
import imports from './imports';
import { VideoController } from './controllers';
import { YoutubeService } from './services/youtube';
import { VideoService } from './services/video';
import { VIDEO_REPOSITORY } from './constants';
import { VideoRepository } from './repositories';
import { BoatModule } from '@libs/boat';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthApiModule } from '../auth/module';

@Module({
  imports: [ BoatModule,
    ScheduleModule.forRoot(),
    AuthApiModule],
  controllers: [VideoController],
  providers: [
    { provide: VIDEO_REPOSITORY, useClass: VideoRepository },
     YoutubeService, VideoService],
  exports: [VideoService],
})
export class VideoModule {}
