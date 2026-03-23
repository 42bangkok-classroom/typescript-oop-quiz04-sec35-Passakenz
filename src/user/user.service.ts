import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  test(): Array<string> {
    return [];
  }

  async findAll(): Promise<Array<IUser>> {
    return await [];
  }
}
