import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}
      async login(authLoginDto: AuthLoginDto) {
        const user = await this.usersRepository.findOne({
            select: ['id','email', 'password', 'permission'],
            where: {
              email: authLoginDto.email
            },
          });
        if(!user) {
            throw new NotFoundException('User not found')
        }

        //compare email & password
        const isValid = await argon2.verify(user.password, authLoginDto.password)
        if(!isValid) {
            throw new UnauthorizedException('Invalid password')
        }

        //create token
        const token = await this.jwtService.signAsync({
            user_id: user.id,
            permission: user.permission
        }, {secret: process.env.JWT_SECRET})
        return {
            "access_token": token
        };
      }
}
