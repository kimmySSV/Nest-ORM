import { Body, Controller, Get, HttpCode, Ip, Post, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}
  
  // localhost:3000/api/v1/auth/login
  @Post('login')
  @HttpCode(200)
  login(@Headers() headers: any, @Ip() ip: string, @Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(headers, ip, authLoginDto);
  }

  // localhost:3000/api/v1/auth/profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
