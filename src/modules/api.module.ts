import { Module } from '@nestjs/common';
import { ApiController } from '../controller/api.controller';
import { ApiService } from '../service/api.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
