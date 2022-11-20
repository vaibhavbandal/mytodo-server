import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/utils/google.strategy';
import { SessionSerializer } from './auth/utils/Serializer';
import { BcryptModule } from './common/bcrypt.module';
import { DateModule } from './common/date/date.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    BcryptModule,
    DateModule,
    PrismaModule,
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
