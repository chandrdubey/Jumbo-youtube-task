import { Exists } from '@libs/boat/validator';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @Exists({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
