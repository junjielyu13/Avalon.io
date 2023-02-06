import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from '../service/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Post('creatRoom')
  createRoom(): string {
    return this.apiService.createRoom();
  }

  @Get('join')
  joinRoom(): string {
    return this.apiService.joinRoom();
  }

  @Get('playe_code')
  yyj(): string {
    return this.apiService.joinRoom();
  }
}
