import { Injectable } from '@nestjs/common';
import { DatabaseRepository, InjectModel } from '@libs/boat/db';
import { VideoModel } from '@libs/videos/models';
import { VideoRepositoryContract } from './contract';
import { Video$Modal$Interface } from '@libs/videos/interface/video';
import { UserVideoModel } from '../../models/userVideoLink';
import { UserModel } from '@libs/users';

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
        .join(' user_video', function () {
          this.on('videos.id', 'user_video.videoId').onVal(
            'user_video.userId',
            userId,
          );
        })
        .orderBy('user_video.createdAt', 'DESC');
    }

    return paginate
      ? query.paginate<Video$Modal$Interface>(page, perPage)
      : query.allPages<Video$Modal$Interface>();
  }

  async linkUser(params) {
    const { userId, videoId } = params;
    const exists = await UserVideoModel.query()
      .where({ userId, videoId })
      .first();
    if (!exists) {
      let userVideoLinkQuery = await UserVideoModel.query().insert({
        userId,
        videoId,
      } as any);
    }

    return true;
  }
  async unLinkUser(params) {
    const { userId, videoId } = params;
    let userVideoLinkQuery = await UserVideoModel.query()
      .delete()
      .where({
        userId,
        videoId,
      } as any);
    return true;
  }
}
