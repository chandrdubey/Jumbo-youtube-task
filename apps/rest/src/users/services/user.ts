import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants';
import { UserRepositoryContract } from '../repositories';
import { User$Modal$Interface} from '@app/users';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly users: UserRepositoryContract,
  ) {}

   async createUser(params: User$Modal$Interface) {
    return await this.users.create(params);
   }
  async firstWhere(where: User$Modal$Interface, error = true) {
    return await this.users.firstWhere(where, error);
  }
}
