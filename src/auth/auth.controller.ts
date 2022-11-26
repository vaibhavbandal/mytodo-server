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
import { CacheManegerDto } from 'src/common/cacheManeger/cacheManegerDto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/user-register.dto';
import { GoogleAuthGuard, LocalAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    const { access_token } = await this.authService.loginWithCredentials(
      req.user,
    );
    const loginRedirectHtmp = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Google Login Redirect</title>
    </head>
    <body>
            <h3>Wait....... Redirecting to React App</h3>
    </body>
    <script>
        
        function redirect(){
                const url ='http://localhost:3000/login-google/${access_token}';
                window.location.replace(url);    

        }
        
        redirect();
    
    </script>
    </html>`;
    res.send(loginRedirectHtmp);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.loginWithCredentials(req.user);
  }

  @Post('verification')
  async userVerification(@Body() bodyData: RegisterUserDto) {
    return await this.authService.userVerification(bodyData);
  }

  @Post('register')
  async registerNewUser(@Body() otp: CacheManegerDto) {
    return await this.authService.registerNewUser(otp);
  }

  @Post('forgot/verification')
  async forgotVerification(@Body() email: {email : string}){
    return await this.authService.forgotVerification(email);
  }

  @Post('forgot/otpVerification')
  async otpVerification(@Body() otp : {otp : number}){
    return await this.authService.forgotOtpVerification(otp);
  }

  @Post('forgot/changePassword')
  async changePassword(@Body() newPassword: {newPassword : string}){
      return await this.authService.changePassword(newPassword);
  }
}
