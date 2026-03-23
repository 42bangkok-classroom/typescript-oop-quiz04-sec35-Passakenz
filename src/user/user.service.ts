import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs/promises';

@Injectable()
export class UserService {
  private readonly dbPath = 'data/users.json';

  constructor(private readonly userService: UserService) {}

  private async readDB(): Promise<IUser[]> {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      return JSON.parse(data) as IUser[];
    } catch {
      return [];
    }
  }

  test(): Array<string> {
    return [];
  }

  async findAll(): Promise<IUser[]> {
    return await this.readDB();
  }
}
