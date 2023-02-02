import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('index')
  @Render('index')
  getIndex(): { message: string } {
    return { message: 'hello ejs!' };
  }
}
