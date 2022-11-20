import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
  ) {}

  // Local Auth
  async validateUserLocal(email: string, password: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });

      const isPassword = await this.bcryptService.compareHash(
        password,
        user.password,
      );
      if (isPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
