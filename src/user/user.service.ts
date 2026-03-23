import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  private readonly filePath = path.join(process.cwd(), 'data/users.json');

  private readFile(): IUser[] {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    const data: unknown = JSON.parse(raw);
    return data as IUser[];
  }

  private writeFile(users: IUser[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  test(): Array<string> {
    return [];
  }
  findAll(): IUser[] {
    return this.readFile();
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

  create(dto: CreateUserDto): IUser {
    const users = this.readFile();

    const lastId = users.length > 0 ? Number(users[users.length - 1].id) : 0;
    const newUser: IUser = {
      id: String(lastId + 1),
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      username: dto.username,
    };

    users.push(newUser);
    this.writeFile(users);

    return newUser;
  }
}
