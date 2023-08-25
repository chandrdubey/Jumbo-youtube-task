import { RepositoryContract } from '@libs/boat/db';
import { Video$Modal$Interface } from '../../interface/video';

export interface VideoRepositoryContract
  extends RepositoryContract<Video$Modal$Interface> {
  bulkInsertOrUpdateVideos(videoData: Video$Modal$Interface[], whereIn: string);
  search(params: Record<string, any>);
  addToWAtchLater(params);
  removeFromWatchLater(params);
}
