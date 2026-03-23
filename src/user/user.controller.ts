import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Body,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { IUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getUser(): Array<string> {
    return this.userService.test();
  }

  @Get()
  findAll(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<IUser> {
    const parsedFields = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, parsedFields);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto): IUser {
    return this.userService.create(dto);
  }
}
