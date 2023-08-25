import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response, RestController } from '@libs/boat';
import { AuthApiService } from '../services/service';
import { UserTransformer } from '@libs/users';
import { AuthGuard } from '../decorators';
@Controller('auth')
export class AuthController extends RestController {
  constructor(private readonly service: AuthApiService) {
    super();
  }
  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const { user, token } = await this.service.register(req.all());
    return res.success({
      ...(await this.transform(user, new UserTransformer(), { req })),
      token,
    });
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { user, token } = await this.service.login(req.all());
    return res.success({
      ...(await this.transform(user, new UserTransformer(), { req })),
      token,
    });
  }

  // @AuthGuard()
  // @Get('profile')
  // async profile(@Req() req: Request, @Res() res: Response) {
  //   return res.success(
  //     await this.transform(req.user, new UserTransformer(), { req }),
  //   );
  // }
}
