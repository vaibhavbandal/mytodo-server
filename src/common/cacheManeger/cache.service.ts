import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManegerService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  getData = () => {
    const value = this.cacheManager.get('user');
    return value;
  };

  addToCache = (cacheBody: object) => {
    this.cacheManager.set('user', cacheBody, 10000000);
  };

  delCache = async (key: string) => this.cacheManager.del('user');

  resetCache = async () => this.cacheManager.reset();
}
