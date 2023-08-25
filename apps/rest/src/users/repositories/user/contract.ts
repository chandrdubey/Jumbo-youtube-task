import { RepositoryContract } from '@libs/boat/db';
import { User$Modal$Interface} from '@app/users';

export interface UserRepositoryContract
  extends RepositoryContract<User$Modal$Interface> {}
