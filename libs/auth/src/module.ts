import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersLibModule } from '@libs/users';
import { JwtStrategy } from './jwtStrategies';
import { BoatModule } from '@libs/boat';
import { AuthLibService } from './services/auth';
@Module({
  imports: [
    BoatModule,
    UsersLibModule,
    PassportModule.register({
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
    }),
  ],
  providers: [JwtStrategy, PassportModule, AuthLibService],
  exports: [AuthLibService],
})
export class AuthLibModule {}
