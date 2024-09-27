import {
  HttpException,
  HttpStatus,
  Injectable,
  Ip,
  Req, 
  Headers,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserActivityEntity } from './entities/user-activity.entitiy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(UserActivityEntity)
    private userActivityRepository: Repository<UserActivityEntity>
  ) {}
  async login(@Headers() headers: any, @Ip() ip: string, authLoginDto: AuthLoginDto) {
    const user = await this.usersRepository.findOne({
      select: ['id', 'fullname', 'email', 'password', 'permission'],
      where: {
        email: authLoginDto.email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //compare email & password
    const isValid = await argon2.verify(user.password, authLoginDto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    //create token
    const token = await this.jwtService.signAsync(
      {
        user_id: user.id,
        permission: user.permission,
      },
      { secret: process.env.JWT_SECRET },
    );

    let header_str = JSON.stringify(headers);
    header_str = header_str.replaceAll("-", "");
    const header_details = JSON.parse(header_str);
    console.log(ip);
    
    
    const user_activity = new UserActivityEntity();
    //const ipAddress = authLoginDto.connection.remoteAddress;
    user_activity.AUTH_MODE = "LOGIN";
    user_activity.USERID = user.id;
    user_activity.USER_AGENT = authLoginDto.userAgent;
    user_activity.USER_IP = ip;
    const userActivitySave = await this.userActivityRepository.save(user_activity);
    if(!userActivitySave){
      throw new HttpException('Something Went Wrong !!!', HttpStatus.BAD_REQUEST ); //400
    }


    return {
      access_token: token,
      status: 'success',
      user_id: user.id,
      fullname: user.fullname,
      email: user.email,
      permission: user.permission,
    };
  }
}
