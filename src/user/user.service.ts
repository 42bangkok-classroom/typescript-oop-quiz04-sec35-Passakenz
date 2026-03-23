import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  test(): Array<string> {
    return [];
  }
  findAll(): IUser[] {
    const filePath = path.join(process.cwd(), 'data/users.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as IUser[];
  }
  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => String(u.id) === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (!fields) {
      return user;
    }

    if (fields.length === 0) {
      return {};
    }

    return fields.reduce((acc, field) => {
      if (field in user) {
        acc[field as keyof IUser] = user[field as keyof IUser];
      }
      return acc;
    }, {} as Partial<IUser>);
  }
}
