import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Player, Room } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async createGame(roomData): Promise<Room> {
    const result = await this.room.create({ data: roomData });
    return result;
  }

  async createPlayer(playerData): Promise<Player> {
    const result = await this.player.create({ data: playerData });
    return result;
  }
}
