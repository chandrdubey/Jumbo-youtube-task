const { google } = require('googleapis');

import { Video$Modal$Interface } from '@libs/videos';
import { Injectable } from '@nestjs/common';

const youtubeUrl = "https://www.youtube.com/watch?v=video_id"

@Injectable()
export class YoutubeService {
  private youtube;
  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY, // replace with your API Key
    });
  }

  async getYoutubeVideos() {
    const result = await this.youtube.videos.list({
      chart: 'mostPopular',
      regionCode: 'IN', // region code
      maxResults: 4,   // maximum number of videos,  we can change this
      part: 'snippet,contentDetails,statistics',
    });
    const trendingVideos = result.data.items;
    return this.youtubeVideoTransform(trendingVideos);
  }

  async youtubeVideoTransform(data): Promise<Video$Modal$Interface[]> {
    return data.map(
      (video) =>
        ({
          ytId: video.id,
          publishedAt: video.snippet.publishedAt,
          description: video.snippet.description,
          title: video.snippet.title,
          thumbnailUrl: video.snippet.thumbnails.default.url,
          videoUrl: youtubeUrl.replace("video_id", video.id),
        } as Video$Modal$Interface),
    );
  }
}
