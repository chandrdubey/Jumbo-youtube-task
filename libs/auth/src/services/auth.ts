import { UserLibService } from '@libs/users';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthLibService {
  constructor(
    private readonly users: UserLibService,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload) {
    return this.jwtService.sign(payload);
  }
}
