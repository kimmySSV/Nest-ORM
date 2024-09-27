import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { UserActivityEntity } from './entities/user-activity.entitiy';
import { ConfigModule } from '@nestjs/config';
import { HeaderApiKeyStrategy } from './header-api-key.strategy';

@Module({
  imports: [
    PassportModule, ConfigModule,
    JwtModule.register({
      signOptions: { expiresIn: '5h' },
    }),
    TypeOrmModule.forFeature([UserEntity,UserActivityEntity]),
  ],
  providers: [AuthService, JwtStrategy, HeaderApiKeyStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
