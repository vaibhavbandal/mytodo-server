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
      clientID: '571322741267-es47lti32t8s3qbepgh8lvmcq4rd13ps.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  // Automatic call by google...
  async validate(accessToken: string, refreshToken: string, profile: Profile) {

    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      role:Role.USER,
      provider:Provider.GOOGLE
    });
    return user || null;
  }
}