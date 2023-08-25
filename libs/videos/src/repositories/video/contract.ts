import { RepositoryContract } from '@libs/boat/db';
import { User$Modal$Interface} from '@libs/users';
import { Video$Modal$Interface } from '@libs/videos/interface/video';

export interface VideoRepositoryContract
  extends RepositoryContract<User$Modal$Interface> {
  bulkInsertOrUpdateVideos(videoData: Video$Modal$Interface[], whereIn: string);
  search(params: Record<string, any>);
  linkUser(params);
  unLinkUser(params);
}
