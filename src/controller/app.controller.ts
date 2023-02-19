import { Controller, Get, Post, Render, Param } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): { message: string } {
    return { message: 'hello ejs!' };
  }

  @Get('index')
  @Render('index')
  getIndex(): { message: string } {
    return { message: 'heldo ejs!' };
  }

  @Get('room/:room_code')
  @Render('game')
  getGame(@Param() params): { message: string } {
    return { message: params.room_code };
  }
}
