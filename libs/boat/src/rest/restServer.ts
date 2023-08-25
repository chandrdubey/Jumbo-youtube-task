import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ServerOptions } from './interfaces';
import { RequestGuard } from './guards';
import { ExceptionFilter } from '../exceptions';
import { TimeoutInterceptor } from './timeoutInterceptor';

export class RestServer {
  private module: any;
  private options: ServerOptions;

  static async make(module: any, options?: ServerOptions): Promise<void> {
    const app = await NestFactory.create(module);

    if (options?.addValidationContainer) {
      useContainer(app.select(module), { fallbackOnErrors: true });
    }

    app.enableCors({ origin: true });
    if (options?.globalPrefix) {
      app.setGlobalPrefix(options.globalPrefix);
    }

    // interceptors
    app.useGlobalInterceptors(new TimeoutInterceptor());

    app.useGlobalGuards(new RequestGuard());
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionFilter(httpAdapter));

    await app.listen(options?.port || 3000);
  }
}
