import { RestServer } from '@libs/boat';
import { RestModule } from './app';

RestServer.make(RestModule, {
  port: +process.env.REST_APP_PORT,
  addValidationContainer: true,
  globalPrefix: 'api/v1',
});
