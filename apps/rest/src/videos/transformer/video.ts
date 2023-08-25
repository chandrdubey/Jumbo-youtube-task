import { Transformer } from '@libs/boat';

import { Video$Modal$Interface } from '../interface/video';

export class VideoTransformer extends Transformer {
  public defaultIncludes: any[] = [];
  public availableIncludes = [];
  async transform(video: Video$Modal$Interface): Promise<Record<string, any>> {
    return {
      uuid: video.uuid,
      ytId: video.ytId,
      title: video.title,
      description: video.description,
      publishedAt: video.publishedAt,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
    };
  }
}
