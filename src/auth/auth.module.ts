import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptModule } from 'src/common/bcrypt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './utils/jwt.strategy';
import { LocalStrategy } from './utils/local.strategy';

@Module({
  imports:[PassportModule,UserModule,PrismaModule, BcryptModule,JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '220d' },
  })
],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService,JwtModule]
})
export class AuthModule {}