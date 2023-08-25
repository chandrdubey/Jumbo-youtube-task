import { Transformer } from '@libs/boat';

import { User$Modal$Interface} from '../interface/user';

export class UserTransformer extends Transformer {
  public defaultIncludes: any[] = [];
  public availableIncludes = [];
  async transform(user: User$Modal$Interface): Promise<Record<string, any>> {
    console.log("🚀 ~ file: user.ts:9 ~ UserTransformer ~ transform ~ user:", user)
    return {
      id: user.uuid,
      fullName: user?.fullName,
      username: user?.userName,
      email: user.email,
    };
  }
}
