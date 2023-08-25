import { Module } from '@nestjs/common';
import { BoatModule } from '@libs/boat';
import { VIDEO_REPOSITORY } from './constants';
import { VideoLibService } from './services';
import { VideoRepository } from './repositories';

@Module({
  imports: [BoatModule],
  providers: [
    VideoLibService,
    { provide: VIDEO_REPOSITORY, useClass: VideoRepository },
  ],
  exports: [VideoLibService],
})
export class VideosLibModule {}
