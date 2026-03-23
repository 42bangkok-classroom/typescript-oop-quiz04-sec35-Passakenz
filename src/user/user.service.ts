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
      const filePath = path.join(process.cwd(), 'data', 'users.json');
      const data = await fs.readFile(filePath, 'utf-8');
      const users: IUser[] = JSON.parse(data);
      return Array.isArray(users) ? (users as IUser[]) : [];
    } catch {
      return [] as IUser[];
    }
  }
}
