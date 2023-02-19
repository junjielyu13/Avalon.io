import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ApiModule } from './modules/api.module';
import { PrismaModule } from './modules/prisma.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ApiModule, PrismaModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
