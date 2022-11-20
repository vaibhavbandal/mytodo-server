import { Module, CacheModule } from '@nestjs/common';
import { CacheManegerService } from './cache.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CacheManegerService],
  exports: [CacheManegerService],
})
export class CacheManegerModule {}
