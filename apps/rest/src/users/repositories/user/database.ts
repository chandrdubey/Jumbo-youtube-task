import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryContract } from './contract';
import { User$Modal$Interface, UserModel} from '@app/users';
import { DatabaseRepository, InjectModel } from '@libs/boat/db';

@Injectable()
export class UserRepository
  extends DatabaseRepository<User$Modal$Interface>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;
}
