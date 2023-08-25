import { Module } from '@nestjs/common';
import { BoatModule } from '@libs/boat';
import { USER_REPOSITORY } from './constants';
import { UserLibService } from './services';
import { UserRepository } from './repositories';

@Module({
  imports: [BoatModule],
  providers: [
    UserLibService,
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [UserLibService],
})
export class UsersLibModule {}
