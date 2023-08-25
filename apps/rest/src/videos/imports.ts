import { BoatModule } from '@libs/boat';
// import { UsersLibModule } from '@libs/users';
// import { AuthLibModule } from '@libs/auth';
import {AuthApiModule} from '@app/auth'
import { ScheduleModule } from '@nestjs/schedule';

export default [
  BoatModule,
  ScheduleModule.forRoot(),
  AuthApiModule,
];
