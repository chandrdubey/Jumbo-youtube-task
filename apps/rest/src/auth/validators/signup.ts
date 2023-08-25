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

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
