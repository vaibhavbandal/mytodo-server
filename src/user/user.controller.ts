import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/utils/Guards';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Request() req: any) {
    return req.user;
  }
}
