import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {}
