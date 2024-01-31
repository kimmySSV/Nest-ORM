import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      user.fullname = createUserDto.fullname;
      user.email = createUserDto.email;
      user.password = await argon2.hash(createUserDto.password);
      //console.log(user);
      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      if(error.errno === 1062){
        throw new HttpException('Duplicate Email !!!', HttpStatus.CONFLICT); //409
      }      
      throw new HttpException('Something Went Wrong !!!', HttpStatus.BAD_REQUEST ); //400
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ order: { id: 'DESC' } });
  }

  // SQL
  // async findAll(): Promise<any[]>{
  //   const sql = 'SELECT * FROM user ORDER BY id DESC';
  //   return await this.usersRepository.query(sql);
  // }

  //Pagination
  async findAllWithPagination(page: number, page_size: number): Promise<User[]> {
    const users =  await this.usersRepository.find({ 
      skip: (page - 1) * page_size,
      take: page_size,
      order: { id: 'DESC' } 
    });
    return users;
  }

  async findOne(id: number): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if(!user){
      throw new HttpException('No record found', HttpStatus.NOT_FOUND);
    }
    
    return user;
  }
  ;
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  // async remove(id: number): Promise<User> {
  //   const user = await this.usersRepository.findOne({where:{id:id}});
  //   return await this.usersRepository.remove(user);
  // }
}
