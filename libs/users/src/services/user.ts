import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants';
import { UserRepositoryContract } from '../repositories';
import { User$Modal$Interface} from '@libs/users';

@Injectable()
export class UserLibService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly users: UserRepositoryContract,
  ) {}

  async updateWhere(where: User$Modal$Interface, params: User$Modal$Interface) {
    return await this.users.update(where, params);
  }

  async createUser(params: User$Modal$Interface) {
    return await this.users.create(params);
  }

  async updateUser(userId: number, params: User$Modal$Interface) {
    await this.users.updateWhere({ id: userId }, params);
    return await this.users.firstWhere({ id: userId });
  }

  async firstWhere(where: User$Modal$Interface, error = true) {
    return await this.users.firstWhere(where, error);
  }
}
