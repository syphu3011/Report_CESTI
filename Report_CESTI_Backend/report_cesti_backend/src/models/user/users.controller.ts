import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service'
import { User } from './user.entity'


@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {

  }

  @Get()
  findAll(): Promise<User[]> {
    return this.UserService.findAll()
  }

  @Get(':id')
  get(@Param() params) {
    return this.UserService.findOne(params.id);
  }

//   @Post()
//   create(@Body() User: User) {
//     return this.UserService.create(User);
//   }

//   @Put()
//   update(@Body() User: User) {
//     return this.UserService.update(User);
//   }

//   @Delete(':id')
//   deleteUser(@Param() params) {
//     return this.UserService.delete(params.id);
//   }
}

