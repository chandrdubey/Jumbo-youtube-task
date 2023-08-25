import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserLibService, User$Modal$Interface} from '@libs/users';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InvalidCredentials } from '@libs/boat';
import { JwtPayload } from './interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserLibService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User$Modal$Interface> {
    const { uuid } = payload;

    let user;

    if (uuid) {
      user = await this.userService.firstWhere({ uuid });
    }
    if (!user) {
      throw new InvalidCredentials();
    }
    return user;
  }
}
