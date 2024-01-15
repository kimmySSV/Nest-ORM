import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';


@Controller({
  version: '1',
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      permission: user.permission,

    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('paginate')
  findAllWithPaginate(@Query() query: any){
    return this.usersService.findAllWithPagination(query.page, query.page_size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    if(result.affected === 0){
      throw new HttpException('Can not update record', HttpStatus.BAD_REQUEST);
    }
  return {message: `Record ID:${id} => Updated`} 
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if(result.affected === 0){
      throw new HttpException('Can not delete record', HttpStatus.BAD_REQUEST);
    }
    return {message: `Record ID:${id} => Deleted`}
  }
}
