import { Module } from '@nestjs/common';
import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';
import { ApiController } from '../controller/api.controller';
import { ApiService } from '../service/api.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApiController, PrismaController],
  providers: [ApiService, PrismaService],
})
export class ApiModule {}
