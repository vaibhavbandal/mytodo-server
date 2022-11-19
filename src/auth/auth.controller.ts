import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { GoogleAuthGuard, LocalAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //tested ok
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  //tested ok
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    const token = await this.authService.loginWithCredentials(req.user);
    res.send(token);
  }

  //tested ok
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.loginWithCredentials(req.user);
  }

  //tested ok
  @Post('register')
  async registerNewUser(@Body() bodyData: RegisterUserDto) {
    return await this.authService.registerNewUser(bodyData);
  }
}
