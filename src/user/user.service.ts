import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  test(): Array<string> {
    return [];
  }

  async findAll(): Promise<Array<string>> {
    return [];
  }
}
