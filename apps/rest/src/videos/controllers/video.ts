import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response, RestController } from '@libs/boat';
import { VideoService } from '../services/video';
import { UserTransformer } from '@libs/users';
import { AuthGuard } from '@app/auth';
import { VideoTransformer } from '@libs/videos';
import { Console } from 'console';
@Controller('videos')
export class VideoController extends RestController {
  constructor(private readonly service: VideoService) {
    super();
  }

  // @AuthGuard()
  @Get()
  async search(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.search(req.all(), req.user);
    return res.success(
      await this.paginate(result, new VideoTransformer(), { req }),
    );
  }

  @AuthGuard()
  @Get('watch_later')
  async watchLater(@Req() req: Request, @Res() res: Response) {

    console.log( "===============++>", req.user, req.all())
    const result = await this.service.watchLater(req.all(), req.user);
    return res.success(
      await this.paginate(result, new VideoTransformer(), { req }),
    );
  } 

  @Get(':id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.getById(req.all());
    return res.success(
      await this.transform(result, new VideoTransformer(), { req }),
    );
  }

  @AuthGuard()
  @Post('watch_later')
  async addToWatchLater(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.addToWatchLater(req.all(), req.user);
    return res.success('true');
  }

  @AuthGuard()
  @Delete('watch_later')
  async removeFromWatchLater(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.removeFromWatchLater(req.all(), req.user);
    return res.success('true');
  }
}
