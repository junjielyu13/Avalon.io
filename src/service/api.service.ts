import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  joinRoom(): any {
    return {
      code: 200,
      id: 15894357936346,
      msg: 'join room sucessfu',
    };
  }

  createPlayer(data: Prisma.PlayerCreateInput): any {
    return this.prisma.player.create({
      data,
    });
  }
}
