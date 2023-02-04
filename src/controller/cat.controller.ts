import { Controller, Get, Render } from '@nestjs/common';
import { CatsService } from '../service/cat.service';

@Controller()
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  //   @Get()
  //   getHello(): string {
  //     return this.appService.create();
  //   }

  //   @Get('index')
  //   @Render('index')
  //   getIndex(): { message: string } {
  //     return { message: 'hello ejs!' };
  //   }
}
