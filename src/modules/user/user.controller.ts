import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { FindUserParams } from 'src/interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/Create')
  async create(@Body() data: CreateUserDto) {
    return await this.userService.CreateUser({ data });
  }

  @Get()
  async findAllUser(@Query() query: FindUserParams) {
    return await this.userService.findAllUser({ query });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOneUser(id);
  }

  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser({ id, data });
  }
}
