import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { LocalService, Services } from './services';
import { BoatModule } from '@libs/boat';
import { UserModule } from '../users';
import { AuthLibModule } from '@libs/auth';
import { JwtModule , JwtService} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthApiService } from './services/service';
import { JwtStrategy } from './jwtStrategies';
import imports from './imports';

@Module({
  imports:  [BoatModule, UserModule, PassportModule.register({
    defaultStrategy: 'jwt',
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get('auth.jwt.secret'),
        signOptions: {
          expiresIn: config.get('auth.jwt.ttl'),
        },
      };
    },
    inject: [ConfigService],
  }),]
,
  controllers: [AuthController],
  providers:  [ AuthApiService, JwtStrategy],
  exports: [AuthApiService],
})
export class AuthApiModule {}
