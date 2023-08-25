import { JwtService } from '@nestjs/jwt';
import { AuthApiService } from './service';
import { JwtStrategy } from '../jwtStrategies';

const Tasks = [];
const LocalService = [...Tasks, AuthApiService, JwtService];

const Services = [...LocalService, JwtStrategy,];
export { LocalService, Services, AuthApiService };
