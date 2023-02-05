import { Module } from '@nestjs/common';
import { PrismaController } from '../controller/prisma.controller';
import { PrismaService } from '../service/prisma.service';

@Module({
  imports: [],
  controllers: [PrismaController],
  providers: [PrismaService],
})
export class PrismaModule {}
