import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) { }

  async joinRoom(player_code: string, room_code: string, player_name: string = null): Promise<any> {
    // 通过code获得玩家或房间
    let player = (await this.prisma.player.findUnique({ where: { code: player_code } }));
    let room = (await this.prisma.room.findUnique({ where: { code: room_code } }));
    player_name = player_name ? player_name : player.name;
    // 记录玩家自己在哪个房间里面
    const updatePlayer = await this.prisma.player.update({
      where: {
        id: player.id,
      },
      data: {
        room_id: room.id,
        name: player_name,
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
        msg: "Player " + player.code + " is already in the room"
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
        msg: "Cannot find the room, join room failed"
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

  async startGame(room_code: string): Promise<any> {
    let room = (await this.prisma.room.findUnique({ where: { code: room_code } }));
    if (!room) {
      console.log("无法获取对应房间,开始游戏失败");
      return {
        code: "400",
        msg: "Cannot find the room, start failed"
      }
    }

    return "not finished"
    // 判断人家人数是否到5
    // 给玩家分配身份
    // 设置游戏为开始状态
  }

  async leaveRoom(player_code: string): Promise<any> {
    // 通过code获得玩家
    let player = await this.prisma.player.findUnique({ where: { code: player_code } });
    if (!player) {
      console.log("无法获取对应玩家, 离开房间失败");
      return {
        code: "400",
        msg: "Cannot find the player, leave room failed"
      }
    }
    if (!player.room_id) {
      console.log("玩家" + player_code + "并没有在任何房间内, 离开房间失败");
      return {
        code: "400",
        msg: "Player " + player_code + "is not joined the room, leave room failed"
      }
    }
    let room = await this.prisma.room.findUnique({ where: { id: player.room_id } });
    if (!room) {
      console.log("无法获取对应房间, 离开房间失败");
      return {
        code: "400",
        msg: "Cannot find the room, leave room failed"
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
        console.log("更新房间数据失败,离开房间失败");
        return {
          code: "400",
          msg: "Cannot update room data, leave room failed"
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
      console.log("更新玩家失败,离开房间失败");
      return {
        code: "400",
        msg: "Cannot update player data, leave room failed"
      }
    }
    console.log("玩家成功离开房间");
    return {
      code: "200",
      msg: "Leave the room succesful!"
    }
  }

  async createPlayer(data: Prisma.PlayerCreateInput): Promise<any> {
    // 获取当前的玩家code
    let playerUtil = await this.prisma.util.findFirst();
    let playerCount = 0;
    // 如果没有没找到util则创建之
    if (!playerUtil) {
      await this.prisma.util.create(
        {
          data: {
            player_count: 1,
            room_count: 1
          }
        });
    } else {
      playerCount = playerUtil.player_count;
      await this.prisma.util.update({
        where: {
          id: playerUtil.id
        }, data: {
          player_count: playerCount + 1
        }
      })
    }
    // 使用获得的playercode修改data中的对应数据
    data.code = this.intToString(playerCount, 5);
    // 尝试创建玩家
    let ret = await this.prisma.player.create({ data });
    // 创建玩家失败
    if (!ret) {
      console.error("创建玩家失败");
      return {
        code: "400",
        msg: "Create player failed"
      };
    }
    // 创建玩家成功
    return {
      code: "200",
      msg: "Create player sucessful",
      player_code: ret.code,
      player_id: ret.id,
      player_name: ret.name
    };
  }

  async createRoomByPlayerID(player_id: string, player_name: string = null): Promise<any> {
    // 获取当前的房间
    let roomUtil = await this.prisma.util.findFirst();
    let roomCount = 0;
    // 如果没有没找到util则创建之
    if (!roomUtil) {
      await this.prisma.util.create(
        {
          data: {
            player_count: 1,
            room_count: 1
          }
        });
    } else {
      roomCount = roomUtil.room_count;
      await this.prisma.util.update({
        where: {
          id: roomUtil.id
        }, data: {
          room_count: roomCount + 1
        }
      })
    }
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
        msg: "Create room failed"
      };
    }
    // 创建房间成功
    //尝试加入房间，但是这里失败了不会提示...
    this.joinRoom(player_id, ret.id, player_name);
    return {
      code: "200",
      msg: "Create room succesful",
      room_code: ret.code,
      room_id: ret.id
    };
  }

  async createRoomByPlayerCode(player_code: string, player_name: string = null): Promise<any> {
    // 通过玩家的code获得玩家id
    let player_id = (await this.prisma.player.findUnique({
      where: {
        code: player_code
      }
    })).id
    // 创建房间
    return this.createRoomByPlayerID(player_id, player_name);
  }

  // Int转 String并填充至对应数位
  intToString(num: number, size: number): string {
    let s = num.toString();
    while (s.length < size)
      s = "0" + s;
    return s;
  }

  async debug() {
    return "debug msg";
  }
}
