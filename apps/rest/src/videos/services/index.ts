import { YoutubeService } from './youtube';
import { VideoService } from './video';
import { VideoRepository } from '../repositories';
import { VIDEO_REPOSITORY } from '../constants';

// const Tasks = [YoutubeApiTasks];
const LocalService = [YoutubeService, VideoService,{ provide: VIDEO_REPOSITORY, useClass: VideoRepository },
];

const Services = [...LocalService];
export { LocalService, Services };
