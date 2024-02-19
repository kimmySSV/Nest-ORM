import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm/repository/Repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.usersRepository.findOne({
            where: {
              id: payload.user_id,
            },
          });
        if(!user){
            throw new NotFoundException('User not found');
        }
        return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            permission: user.permission

        };
    }
}