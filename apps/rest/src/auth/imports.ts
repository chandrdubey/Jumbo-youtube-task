import { BoatModule } from '@libs/boat';
import { UsersLibModule } from '@libs/users';
import { UserModule } from '../users';
import { AuthLibModule } from '@libs/auth';
import { JwtStrategy } from './jwtStrategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

export default [BoatModule, UserModule, AuthLibModule,   PassportModule.register({
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
  }),];
