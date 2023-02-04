import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';
import { PrismaController } from './controller/prisma.controller';
import { PrismaService } from './service/prisma.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './modules/cats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:password@avalon-db:27017/avalon?authSource=admin',
    ),
    CatsModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
  // controllers: [AppController, ApiController, PrismaController],
  // providers: [AppService, ApiService, PrismaService],
})
export class AppModule {}
