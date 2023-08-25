import { registerAs } from '@nestjs/config';

export default registerAs('http', () => ({
  default: 'localhost',
  clients: {
    localhost: {
      baseUrl: '',
      headers: {},
      timeout: 100,
      retries: 3,
    },
    localhost2: {
      baseUrl: '',
      headers: {},
      timeout: 100,
      retries: 3,
    },
  },
}));
