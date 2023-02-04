import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'dasdaadaasdasdasd hello word';
  }
}
