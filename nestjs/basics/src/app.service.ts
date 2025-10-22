import { Injectable } from '@nestjs/common';

//decorator
// business logic of application will be here
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest JS!';
  }
}
