import { Pagination } from '@libs/boat';
import { RepositoryContract } from '@libs/boat/db';
import { User$Modal$Interface} from '@libs/users';

export interface UserRepositoryContract
  extends RepositoryContract<User$Modal$Interface> {}
