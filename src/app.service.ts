import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to NestJs!';
  }
}

export class UserService {
  test(): string {
    return '[]';
  }
}
