import { ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log("🚀 ~ file: jwt.ts:9 ~ JwtAuthGuard ~ canActivate ~ context:", context)
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
