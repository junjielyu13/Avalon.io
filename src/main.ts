import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static/' });
  app.setBaseViewsDir(join(__dirname, '..', 'resources/view'));
  app.setViewEngine('ejs');

  // HOT LOADING
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());   
  }

  await app.listen(3000);
}
bootstrap();
