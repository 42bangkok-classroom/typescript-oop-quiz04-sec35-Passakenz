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
    try {
      const filePath = path.resolve(process.cwd(), 'data', 'users.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const users: IUser[] = JSON.parse(data) as IUser[];
      return users;
    } catch {
      return [] as IUser[];
    }
  }
}
