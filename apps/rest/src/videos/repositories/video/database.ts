import { Injectable } from '@nestjs/common';
import { DatabaseRepository, InjectModel } from '@libs/boat/db';
import { VideoModel } from '../../models/video';
import { VideoRepositoryContract } from './contract';
import { Video$Modal$Interface } from '../../interface/video';
import { UserVideoLinkModel } from '../../models/userVideoLink';

@Injectable()
export class VideoRepository
  extends DatabaseRepository<Video$Modal$Interface>
  implements VideoRepositoryContract
{
  @InjectModel(VideoModel)
  model: VideoModel;

  async bulkInsertOrUpdateVideos(videoData: Video$Modal$Interface[], whereInKey: string) {
    await this.query()
      .modelClass()
      .transaction(async (trx) => {
        const allVideoId =  videoData.map((video) => video[whereInKey]);
        const existingVideos = await this.query().whereIn(
          whereInKey,
          allVideoId,
        );

        const existingVideoIds = existingVideos.map((video) => video[whereInKey]);

        const videosToUpdate = videoData.filter((video) =>
          existingVideoIds.includes(video[whereInKey]),
        );
        const videosToInsert = videoData.filter(
          (video) => !existingVideoIds.includes(video[whereInKey]),
        );
        if (videosToInsert.length > 0) {
          await this.bulkInsert(videosToInsert);
        }
        if (videosToUpdate.length > 0) {
          await videosToUpdate.forEach(async (videoToUpdate) => {
            await this.query()
              .update(videoToUpdate)
              .where(whereInKey, videoToUpdate[whereInKey]);
          });
        }
      });
  }

  async search(params) {
    const { q, userId, paginate, page, perPage } = params;

    const query = this.query();

    if (q) {
      query.where((subq) =>
        subq
          .orWhere('title', 'like', `%${q}%`)
          .orWhere('description', 'like', `%${q}%`),
      );
    }

    if (userId) {      
      query
        .join(' user_video_link', function () {
          this.on('videos.id', 'user_video_link.videoId').onVal(
            'user_video_link.userId',
            userId,
          );
        })
        .orderBy('user_video_link.createdAt', 'DESC');
    }

    return paginate
      ? query.paginate<Video$Modal$Interface>(page, perPage)
      : query.allPages<Video$Modal$Interface>();
  }

  async addToWAtchLater(params) {
    const { userId, videoId } = params;
    const exists = await UserVideoLinkModel.query()
      .where({ userId, videoId })
      .first();
    if (!exists) {
      await UserVideoLinkModel.query().insert({
        userId,
        videoId,
      } as any);
    }

    return true;
  }
  async removeFromWatchLater(params) {
    const { userId, videoId } = params;
    let userVideoLinkQuery = await UserVideoLinkModel.query()
      .delete()
      .where({
        userId,
        videoId,
      } as any);
    return true;
  }
}
