import { IsUnique } from '@libs/boat/validator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsUnique({ table: 'users', column: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUnique({ table: 'users', column: 'userName' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
