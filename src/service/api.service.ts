import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) { }

  async joinRoom(player_code: string, room_code: string): Promise<any> {
    // 通过code获得玩家或房间
    let player = (await this.prisma.player.findUnique({ where: { code: player_code } }));
    let room = (await this.prisma.room.findUnique({ where: { code: room_code } }));
    // 记录玩家自己在哪个房间里面
    const updatePlayer = await this.prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        room_id: room.id,
      },
    });
    // 如果加入房间失败
    if (!updatePlayer) {
      console.log("无法获取对应玩家,进入房间失败");
      return {
        code: "400",
        msg: "无法获取对应玩家,进入房间失败"
      }
    }
    console.log("更新玩家房间信息成功");
    // 把玩家的id加入到房间的列表里面
    if (room.players.includes(player.id)) {
      console.log("玩家已经在房间内了");
      return {
        code: "400",
        msg: "玩家已经在房间内了"
      };
    }
    // 房间玩家人数+1
    room.player_number++;
    // 把对应玩家的id加入到房间的玩家数组内
    room.players.push(player.id);
    const updateRoom = await this.prisma.room.update({
      where: {
        id: room.id,
      },
      data: {
        player_number: room.player_number,
        players: room.players
      }
    });
    // 如果加入房间失败
    if (!updateRoom) {
      console.log("无法获取对应房间,进入房间失败");
      return {
        code: "400",
        msg: "无法获取对应房间,进入房间失败"
      };
    }
    console.log("加入房间成功");
    return {
      code: "200",
      msg: "加入房间成功",
      player_code: player_code,
      room_code: room_code
    };
  }

  async leaveRoom(player_code: string): Promise<any> {
    // 通过code获得玩家
    let player = await this.prisma.player.findUnique({ where: { code: player_code } });
    if (!player) {
      return {
        code: "400",
        msg: "无法获取对应玩家, 离开房间失败"
      }
    }
    if (!player.room_id) {
      return {
        code: "400",
        msg: "玩家" + player_code + "并没有在任何房间内, 离开房间失败"
      }
    }
    let room = await this.prisma.room.findUnique({ where: { id: player.room_id } });
    if (!room) {
      return {
        code: "400",
        msg: "无法获取对应房间, 离开房间失败"
      }
    }
    let playerIndex = room.players.indexOf(player.id);
    if (playerIndex != -1) {
      room.player_number--;
      room.players.splice(playerIndex, 1);
      const updateRoom = await this.prisma.room.update({
        where: {
          id: room.id,
        },
        data: {
          player_number: room.player_number,
          players: room.players
        },
      });
      if (!updateRoom) {
        return {
          code: "400",
          msg: "更新房间数据失败"
        }
      }
    }
    const updatePlayer = await this.prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        room_id: null
      },
    });
    if (!updatePlayer) {
      return {
        code: "400",
        msg: "更新玩家失败"
      }
    }
    return {
      code: "200",
      msg: "玩家成功离开房间"
    }
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
    let ret = await this.prisma.player.create({ data });
    // 创建玩家失败
    if (!ret) {
      console.error("创建玩家失败");
      return {
        code: "400",
        msg: "创建玩家失败"
      };
    }
    // 创建玩家成功
    return {
      code: "200",
      msg: "创建玩家成功",
      player_code: ret.code,
      player_id: ret.id,
      player_nam: ret.name
    };
  }

  async createRoomByPlayerID(player_id: string): Promise<any> {
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
    var ret = await this.prisma.room.create({
      data: {
        code: this.intToString(roomCount, 5),
        players: [player_id]
      }
    });
    // 创建房间失败
    if (!ret) {
      console.error("创建房间失败");
      return {
        code: "400",
        msg: "创建房间失败"
      };
    }
    // 创建房间成功
    //尝试加入房间，但是这里失败了不会提示...
    this.joinRoom(player_id, ret.id);
    return {
      code: "200",
      msg: "创建房间成功",
      room_code: ret.code,
      room_id: ret.id
    };
  }

  async createRoomByPlayerCode(player_code: string): Promise<any> {
    // 通过玩家的code获得玩家id
    let player_id = (await this.prisma.player.findUnique({
      where: {
        code: player_code
      }
    })).id
    // 创建房间
    return this.createRoomByPlayerID(player_id);
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
}
