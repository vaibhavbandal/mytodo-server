import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Provider, Role } from '@prisma/client';
import { BcryptService } from 'src/common/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private jwtTokenService: JwtService,
  ) {}

  // This is for google Authentication...
  async validateUser(details: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: details.email,
      },
    });
    if (user) return user;
    const newUser = await this.prismaService.user.create({ data: details });
    return newUser;
  }

  async findUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  // This is for Manual login
  async loginWithCredentials(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      role: Role.USER,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async registerNewUser(bodyData: RegisterUserDto) {
    const uPassword = bodyData.password;
    try {
      const isUserExist = await this.prismaService.user.findUnique({
        where: {
          email: bodyData.email,
        },
      });

      if (isUserExist) {
        throw new HttpException(
          { msg: 'Email is already used!' },
          HttpStatus.FORBIDDEN,
        );
      } else {
        const newUser = await this.prismaService.user.create({
          data: {
            email: bodyData.email,
            provider: Provider.MANUAL,
            role: Role.USER,
            password: await this.bcryptService.plainToHash(uPassword),
          },
        });
        const { password, ...result } = newUser;
        return result;
      }
    } catch (error) {
      console.info(error);
      throw new HttpException(
        { msg: 'Email is already used!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
