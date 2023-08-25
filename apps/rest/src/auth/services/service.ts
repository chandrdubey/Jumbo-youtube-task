import { BaseValidator } from '@libs/boat/validator';
import { User$Modal$Interface, UserService } from '../../users';

import { Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from '../validators';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InvalidCredentials } from '@libs/boat';
import { JwtPayload } from '@app/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthApiService {
  constructor(
    private readonly users: UserService,
    private readonly validator: BaseValidator,
    private readonly config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(inputs: Record<string, any>) {
    const params = await this.validator.fire(inputs, LoginDto);
    const user = await this.users.firstWhere({ email: params.email });

    if (!(await this.validateUser(user, params.password))) {
      throw new InvalidCredentials();
    }
    const payload: JwtPayload = { uuid: user.uuid };
    const token = await this.generateJWTToken(payload);
    return { user, token };
  }

  async register(inputs: Record<string, any>) {
    const params = await this.validator.fire(inputs, SignUpDto);
    const password = await this.hashPassword(params?.password);
    const user = await this.users.createUser({
      ...params,
      password,
    });
    const payload: JwtPayload = { uuid: user.uuid };
    const token = await this.generateJWTToken(payload);
    return { user, token };
  }

  async validateUser(user: User$Modal$Interface, password: string): Promise<boolean> {
    const hash = await this.hashPassword(password);
    return hash === user.password;
  }

  async hashPassword(password): Promise<string> {
    const hashkey = await this.config.get('auth.bcryptSalt');
    console.log("🚀 ~ file: service.ts:54 ~ AuthApiService ~ hashPassword ~ hashkey:", hashkey)
    return await bcrypt.hash(password, hashkey);
  }


  async generateJWTToken(payload) {
    return this.jwtService.sign(payload);
  }
}
