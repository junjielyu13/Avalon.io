import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiService } from '../service/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get('joinRoom')
  joinRoom(@Query() query): any {
    return this.apiService.joinRoom(query.player_code, query.room_code, query.player_name);
  }

  @Get('leaveRoom')
  leaveRoom(@Query() query): any {
    return this.apiService.leaveRoom(query.player_code);
  }

  /*
  @Get('startGame')
  startGame(@Query() query): any {
    //return this.apiService.startGame(query.room_code);
    return "not finished";
  }
  */

  @Get('genRandomPlayer')
  genRandomPlayer(): any {
    let name = "User" + this.genRandomInt(0, 9999).toString();
    return this.apiService.createPlayer({ name: name });
  }

  /*
  @Post('createPlayer')
  createPlayer(@Body() body): any {
    return this.apiService.createPlayer({ name: body.player_name });
    //return this.apiService.createPlayer({ name: "西"});
  }
  */

  @Post('createRoom')
  createRoom(@Body() body): any {
    return this.apiService.createRoomByPlayerCode(body.player_code, body.player_name);
    //return this.apiService.createRoomByPlayerID("00001");
  }

  /*
  @Get('debug')
  debug(): any {
    return this.apiService.debug();
  }
*/

  // 包括最小与最大
  genRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
