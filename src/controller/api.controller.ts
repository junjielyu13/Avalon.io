import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiService } from '../service/api.service';
import { Player as PlayerModel } from '@prisma/client';
import { query } from 'express';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get('joinRoom')
  joinRoom(@Query() query): string {
    //return this.apiService.joinRoom(query.player_id, query.room_id);
    return "Not finished"
  }

  @Post('createPlayer')
  createPlayer(@Body() body): any {
    return this.apiService.createPlayer({ name: body.player_name });
    //return this.apiService.createPlayer({ name: "西"});
  }

  @Post('createRoom')
  createRoom(@Body() body): any {
    return this.apiService.createRoomByPlayerCode(body.player_code);
    //return this.apiService.createRoomByPlayerID("63e1808ff5c85f3f5ea0f2c1");
  }

  @Get('debug')
  debug(): any {
    return this.apiService.debug();
  }
}
