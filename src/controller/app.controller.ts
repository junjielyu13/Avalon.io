import { Controller, Get, Post, Render } from '@nestjs/common';
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
}
