import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiService } from '../service/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get('joinRoom')
  joinRoom(@Query() query): any {
    return this.apiService.joinRoom(query.player_code, query.room_code);
  }

  @Get('leaveRoom')
  leaveRoom(@Query() query): any {
    return this.apiService.leaveRoom(query.player_code);
  }

  @Post('createPlayer')
  createPlayer(@Body() body): any {
    return this.apiService.createPlayer({ name: body.player_name });
    //return this.apiService.createPlayer({ name: "西"});
  }

  @Post('createRoom')
  createRoom(@Body() body): any {
    return this.apiService.createRoomByPlayerCode(body.player_code);
    //return this.apiService.createRoomByPlayerID("00001");
  }

  @Get('debug')
  debug(): any {
    return this.apiService.debug();
  }
}
