import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/utils/google.strategy';
import { SessionSerializer } from './auth/utils/Serializer';
import { DateModule } from './common/date/date.module';
import { BcryptModule } from './common/bcrypt/bcrypt.module';
import { CacheManegerModule } from './common/cacheManeger/cache.module';
import { SendEmailModule } from './common/SendMail/sendMail.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    BcryptModule,
    DateModule,
    CacheManegerModule,
    PrismaModule,
    SendEmailModule,
    PassportModule.register({ session: true }),
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AppModule {}
