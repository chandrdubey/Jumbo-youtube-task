import { Transformer } from '@libs/boat';

import { User$Modal$Interface} from '../interface/user';

export class UserTransformer extends Transformer {
  public defaultIncludes: any[] = [];
  public availableIncludes = [];
  async transform(user: User$Modal$Interface): Promise<Record<string, any>> {
    return {
      id: user.uuid,
      firstName: user?.firstName?.replace(/\s+/g, '').trim(),
      lastName: user?.lastName?.replace(/\s+/g, '').trim(),
      email: user.email,
    };
  }
}
