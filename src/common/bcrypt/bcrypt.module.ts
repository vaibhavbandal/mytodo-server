import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
  imports: [],
})
export class BcryptModule {}
