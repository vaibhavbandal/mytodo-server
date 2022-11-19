import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocalStrategy } from 'src/auth/utils/local.strategy';
import { BcryptModule } from 'src/common/bcrypt.module';

@Module({
  imports:[PrismaModule, BcryptModule],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
