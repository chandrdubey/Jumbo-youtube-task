import { Module } from '@nestjs/common';
import { BoatModule } from '@libs/boat';
import { USER_REPOSITORY } from './constants';
import { UserService } from './services';
import { UserRepository } from './repositories';

@Module({
  imports: [BoatModule],
  providers: [
    UserService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
