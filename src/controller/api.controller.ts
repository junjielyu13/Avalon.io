import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from '../service/api.service';
import { Player as PlayerModel } from '@prisma/client';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // @Post('creatRoom')
  // createRoom(): string {
  //   return this.apiService.createRoom();
  // }

  @Get('join')
  joinRoom(): string {
    return this.apiService.joinRoom();
  }

  @Get('playe_code')
  yyj(): string {
    return this.apiService.joinRoom();
  }

  @Post('create')
  createPlayer(): any {
    const playerdata = {
      name: 'Anonymous',
      code: '12345678',
      role: 1,
      accio: 'accion',
    };
    return this.apiService.createPlayer(playerdata);
  }
}
