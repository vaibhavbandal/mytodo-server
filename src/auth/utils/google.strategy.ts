import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Provider, Role } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
      scope: ['profile', 'email'],
    });
  }

  // Automatic call by google...
  // we should known about this function
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log("accessToken............",accessToken)
    // console.log("refreshToken.............",refreshToken)
    // console.log("profile..............",profile)
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      role: Role.USER,
      provider: Provider.GOOGLE,
    });
    return user || null;
  }
}
