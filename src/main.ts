import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasdd3oidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 3000);
  console.info('=============================');
  console.info(`mytodo-server started at ${process.env.PORT }`);
  console.info('=============================');
}
bootstrap();
