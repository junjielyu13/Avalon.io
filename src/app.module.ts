import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';
import { PrismaController } from './controller/prisma.controller';
import { PrismaService } from './service/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ApiController, PrismaController],
  providers: [AppService, ApiService, PrismaService],
})
export class AppModule {}
