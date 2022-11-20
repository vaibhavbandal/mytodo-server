import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Provider, Role } from '@prisma/client';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { CacheManegerService } from 'src/common/cacheManeger/cache.service';
import { CacheManegerDto } from 'src/common/cacheManeger/cacheManegerDto';
import { SendEmailService } from 'src/common/SendMail/sendMail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cacheManegerService: CacheManegerService,
    private readonly bcryptService: BcryptService,
    private readonly sendEmailService: SendEmailService,
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

  async userVerification(bodyData: RegisterUserDto) {
    // const uPassword = bodyData.password;

    const OTP = Math.floor(100000 + Math.random() * 900000);

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
        this.cacheManegerService.addToCache({
          email: bodyData.email,
          password: bodyData.password,
          otp: OTP,
        });

        const emailSend = await this.sendEmailService.sendEmail();
        return emailSend;

        // await this
        // const newUser = await this.prismaService.user.create({
        //   data: {
        //     email: bodyData.email,
        //     provider: Provider.MANUAL,
        //     role: Role.USER,
        //     password: await this.bcryptService.plainToHash(uPassword),
        //   },
        // });
        // const { password, ...result } = newUser;
        // return result;
      }
    } catch (error) {
      console.info(error);
      throw new HttpException(
        { msg: 'Email is already used!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async registerNewUser(otp: number) {
    try {
      const cacheData = this.cacheManegerService.getData();
      console.log(cacheData);
    } catch (error) {
      throw new HttpException(
        { msg: 'Please Register again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
