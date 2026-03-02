import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('user')
    getUser(): string {
        return this.userService.test();
    }
}