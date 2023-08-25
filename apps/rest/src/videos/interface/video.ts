import { ObjectionModel } from '@libs/boat';

export interface Video$Modal$Interface extends ObjectionModel {
  ytId?: string;
  title?: string;
  description?: string;
  publishedAt?: Date | string;
  thumbnailUrl?: string;
  videoUrl?: string;
}
