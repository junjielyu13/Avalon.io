import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  joinRoom(): any {
    return {
      code: 200,
      id: 15894357936346,
      msg: 'join room sucessfu',
    };
  }

  createRoom():any{
    return 0;
  }
}
