import { Controller, Post, Request } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';

@Controller('db')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('createGame')
  createGame(@Request() req): any {
    return this.prismaService.createGame(req);
  }

  @Post('createPlayer')
  createPlayer(@Request() req): any {
    return this.prismaService.createPlayer(req);
  }
}
