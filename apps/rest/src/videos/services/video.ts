import { BaseValidator, isUUID } from '@libs/boat/validator';
import { User$Modal$Interface, UserLibService } from '@libs/users';
import { Inject, Injectable } from '@nestjs/common';
import { Video$Modal$Interface, VIDEO_REPOSITORY, VideoLibService } from '@libs/videos';
import { Cron } from '@nestjs/schedule';
import { CRON_SYNC_YOUTUBE } from '../constant';
import { YoutubeService } from './youtube';
import { SearchVideosDto } from '../validators';
import { VideosGetByIdDto } from '../validators/getById';
import { VideoRepositoryContract } from '../repositories';

@Injectable()
export class VideoService {
  constructor(
    // private readonly users: UserLibService,
    @Inject(VIDEO_REPOSITORY)
    private readonly video: VideoRepositoryContract,
    private readonly validator: BaseValidator,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Cron(CRON_SYNC_YOUTUBE.cronTime, {
    name: CRON_SYNC_YOUTUBE.label,
    timeZone: CRON_SYNC_YOUTUBE.tz,
  })
  async addYoutubeVideos() {
    let data = await this.youtubeService.getYoutubeVideos();
    await this.video.bulkInsertOrUpdateVideos(data, 'ytId');
  }

  async search(inputs: Record<string, any>, user: User$Modal$Interface) {
    let params = await this.validator.fire(inputs, SearchVideosDto);
    if (params.watchLater) {
      params['watchLaterUser'] = user.id;
    }
    return await this.video.search(params);
  }

  async watchLater(inputs: Record<string, any>, user: User$Modal$Interface) {
    let params = await this.validator.fire(inputs, SearchVideosDto);
    params["userId"]= user.id;
    return await this.video.search(params);
  }
  async getById(inputs: Record<string, any>) {
    let params = await this.validator.fire(inputs, VideosGetByIdDto);
    if (isUUID(params.id)) {
      return await this.video.firstWhere({ uuid: params.id }, true);
    } else {
      return await this.video.firstWhere({ ytId: params.id }, true);
    }
  }

  async addToWatchLater(inputs, user: User$Modal$Interface) {
    const video = await this.getById(inputs);
    await this.video.addToWAtchLater({userId:user.id, videoId:video.id});
  }
  async removeFromWatchLater(inputs, user: User$Modal$Interface) {
    const video = await this.getById(inputs);
    await this.video.removeFromWatchLater({userId:user.id, videoId:video.id});
  }
}
