import { Controller ,Get,UseGuards,Req,Res,Request, Post,Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { GoogleAuthGuard, LocalAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {


    constructor(private authService:AuthService){}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
      return { msg: 'Google Authentication' };
    }
  
    // api/auth/google/redirect
    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async handleRedirect(@Req() req,@Res() res) {
      console.info(req.user)
      const token  = await this.authService.loginWithCredentials(req.user);
      res.send( token );
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req:any) {
      return this.authService.loginWithCredentials(req.user);
    }

    @Post('verification')
    async userVerification(@Body() bodyData:RegisterUserDto){
       return await this.authService.userVerification(bodyData);
    }

    @Post('register')
    async registerNewUser(@Body() otp : number){
      return await this.authService.registerNewUser(otp);
    }

}
