import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL,
  },
  bcryptSalt: `${process.env.BCRYPT_SALT}` || '$2b$10$5yMonn8Zmz6nZhUUbfl17O',
}));
