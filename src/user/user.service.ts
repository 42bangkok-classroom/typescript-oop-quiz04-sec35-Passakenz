import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UserService {
  test(): Array<string> {
    return [];
  }
  async findAll(): Promise<IUser[]> {
    return await fs
      .readFile(path.join(__dirname, 'users.json'), 'utf-8')
      .then((data) => {
        return JSON.parse(data) as IUser[];
      });
  }
}
