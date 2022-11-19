import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  plainToHash = async (plainPass: string): Promise<string> => {
    const hash = await bcrypt.hash(plainPass, 12);
    return hash;
  };

  compareHash = async (pass: string, hashPass: string): Promise<boolean> => {
    return await bcrypt.compare(pass, hashPass);
  };
}
