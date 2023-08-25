import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '@libs/users/models';
import { UserRepositoryContract } from './contract';
import { User$Modal$Interface} from '@libs/users/interface/user';
import { DatabaseRepository, InjectModel } from '@libs/boat/db';

@Injectable()
export class UserRepository
  extends DatabaseRepository<User$Modal$Interface>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;
}
