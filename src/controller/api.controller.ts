import { Controller, Get } from '@nestjs/common';
import { ApiService } from '../service/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apuService: ApiService) {}

  @Get('join')
  joinRoom(): string {
    return this.apuService.joinRoom();
  }
}
