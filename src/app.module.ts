import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ApiController } from './controller/api.controller';
import { ApiService } from './service/api.service';
// import { PrismaController } from './controller/prisma.controller';
// import { PrismaService } from './service/prisma.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:password@localhost:27017/?authSource=admin',
    ),
  ],
  // controllers: [AppController, ApiController, PrismaController],
  // providers: [AppService, ApiService, PrismaService],
  controllers: [AppController, ApiController],
  providers: [AppService, ApiService],
})
export class AppModule {}
