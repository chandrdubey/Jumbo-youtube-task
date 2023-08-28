import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response, RestController } from '@libs/boat';
import { AuthApiService } from '../services/service';
import { UserTransformer } from '@app/users';
import { AuthGuard } from '../decorators';
@Controller('auth')
export class AuthController extends RestController {
  constructor(private readonly service: AuthApiService) {
    super();
  }
  @Post('register')
  async register(@Req() req: Request, @Res() res: Response) {
    const { user, token } = await this.service.register(req.all());
    console.log("🚀 ~ file: auth.ts:14 ~ AuthController ~ register ~ user:", user)
    return res.success({
      ...(await this.transform(user, new UserTransformer(), { req })),
      token,
    });
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { user, token } = await this.service.login(req.all());
    console.log("🚀 ~ file: auth.ts:24 ~ AuthController ~ login ~ user:", user)
    return res.success({
      ...(await this.transform(user, new UserTransformer(), { req })),
      token,
    });
  }

}
