import { Module } from '@nestjs/common';
import { CacheManegerModule } from '../cacheManeger/cache.module';
import { SendEmailService } from './sendMail.service';

@Module({
  imports: [CacheManegerModule],
  providers: [SendEmailService],
  exports: [SendEmailService],
})
export class SendEmailModule {}
