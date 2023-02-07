import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) { }

  async joinRoom(player_id, room_id): Promise<any> {
    const updatePlayer = await this.prisma.player.update({
      where: {
        id: player_id,
      },
      data: {
        room_id: room_id,
      },
    });
    if (!updatePlayer) {
      console.log("无法获取对应玩家,进入房间失败");
      return "400";
    }
    console.log("更新玩家成功")
    const updateRoom = await this.prisma.room.update({
      where: {
        id: room_id,
      },
      data: {
        players: [
          player_id
        ]
      }
    });
    if (!updateRoom) {
      console.log("无法获取对应房间,进入房间失败");
      return "400";
    }
    console.log("更新房间成功");
  }

  // Int转 String并填充至对应数位
  intToString(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size)
      s = "0" + s;
    return s;
  }

  async debug() {
    return "测试";
  }

  async createPlayer(data: Prisma.PlayerCreateInput): Promise<any> {
    // 获取当前的玩家code
    let playerCount = (await this.prisma.util.findFirst()).player_count;
    // 不管有没有创建成功，给下个玩家的code+1
    await this.prisma.util.update({
      where: {
        id: "63e1874e7e5e6852db2b2171"
      }, data: {
        player_count: playerCount + 1
      }
    })
    // 使用获得的playercode修改data中的对应数据
    data.code = this.intToString(playerCount, 5);
    // 尝试创建玩家
    let ret = this.prisma.player.create({ data });
    // 创建玩家失败
    if (!ret) {
      console.error("Player creation failed");
      return "400";
    }
    // 创建玩家成功
    return ret;
  }

  async createRoomByPlayerID(player_id): Promise<any> {
    // 获取当前的房间code
    let roomCount = (await this.prisma.util.findFirst()).room_count;
    // 不管有没有创建成功，给下个房间的code+1
    await this.prisma.util.update({
      where: {
        id: "63e1874e7e5e6852db2b2171"
      }, data: {
        room_count: roomCount + 1
      }
    })
    // 尝试创建房间
    var ret = this.prisma.room.create({
      data: {
        code: this.intToString(roomCount, 5),
        players: [player_id]
      }
    });
    // 创建房间失败
    if (!ret) {
      console.error("Room creation failed");
      return "400";
    }
    // 创建房间成功
    this.joinRoom(player_id, (await ret).id);
    return ret;
  }

  async createRoomByPlayerCode(player_code): Promise<any> {
    // 通过玩家的code获得玩家id
    let player_id = (await this.prisma.player.findUnique({
      where: {
        code: player_code
      }
    })).id
    console.log("playerID: ", player_id);
    // 创建房间
    return this.createRoomByPlayerID(player_id);
  }
}
