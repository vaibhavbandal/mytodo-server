import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  //  This method automatic calls when user passes username and password from body.
  //  *****MUST MUST MUST MUST username and password field*****
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUserLocal(username, password);
    if (null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
