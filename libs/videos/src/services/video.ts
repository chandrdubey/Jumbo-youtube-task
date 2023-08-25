import { Inject, Injectable } from '@nestjs/common';
import { VIDEO_REPOSITORY } from '../constants';
import { VideoRepositoryContract } from '../repositories';
import { Video$Modal$Interface } from '@libs/videos';

@Injectable()
export class VideoLibService {
  constructor(
    @Inject(VIDEO_REPOSITORY)
    private readonly video: VideoRepositoryContract,
  ) {}

  async updateWhere(where: Video$Modal$Interface, params: Video$Modal$Interface) {
    return await this.video.update(where, params);
  }

  async createVideo(params: Video$Modal$Interface) {
    return await this.video.create(params);
  }

  async updateVideo(videoId: number, params: Video$Modal$Interface) {
    await this.video.updateWhere({ id: videoId }, params);
    return await this.video.firstWhere({ id: videoId });
  }

  async firstWhere(where: Video$Modal$Interface, error = true) {
    return await this.video.firstWhere(where, error);
  }

  async bulkInsert(params: Video$Modal$Interface[]) {
    return await this.video.bulkInsert(params);
  }

  async bulkInsertOrUpdate(params: Video$Modal$Interface[], whereIn: string) {
    return await this.video.bulkInsertOrUpdateVideos(params, whereIn);
  }

  async search(params) {
    return await this.video.search(params);
  }

  async linkUser(userId: number, videoId: number) {
    return await this.video.linkUser({ userId, videoId });
  }
  async unLinkUser(userId: number, videoId: number) {
    return await this.video.unLinkUser({ userId, videoId });
  }
}
