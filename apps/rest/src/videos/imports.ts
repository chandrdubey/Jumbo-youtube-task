import { BoatModule } from '@libs/boat';

import {AuthApiModule} from '@app/auth'
import { ScheduleModule } from '@nestjs/schedule';

export default [
  BoatModule,
  ScheduleModule.forRoot(),
  AuthApiModule,
];
