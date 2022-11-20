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
  ) { }

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
    try {
      const payload = {
        email: user.email,
        id: user.id,
        role: Role.USER,
      };

      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    } catch (error) {
      throw new HttpException({ msg: 'JWT_ERROR' }, HttpStatus.FORBIDDEN);
    }
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
          otp: OTP
        });

        const emailSend = await this.sendEmailService.sendEmail();
        return emailSend;
      }
    } catch (error) {
      throw new HttpException(
        { msg: 'Email is already used!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async registerNewUser(otp: CacheManegerDto) {
    try {
      const cacheData: any = await this.cacheManegerService.getData();

      const getOtpFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.otp;
      };

      const getEmailFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.email;
      };

      const getPasswordFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.password;
      };

      const cacheOtp: number = await getOtpFromCache(cacheData);
      const cacheEmail: string = await getEmailFromCache(cacheData);
      const cachePassword: string = await getPasswordFromCache(cacheData);

      if (cacheOtp == otp.otp) {
        const newUser = await this.prismaService.user.create({
          data: {
            email: cacheEmail,
            provider: Provider.MANUAL,
            role: Role.USER,
            password: await this.bcryptService.plainToHash(cachePassword),
          },
        });
        const { password, ...result } = newUser;
        return result;
      } else {
        throw new HttpException(
          { msg: 'Invalid Otp!' },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        { msg: 'Please Register again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async forgotVerification(email: { email: string }) {
    // const uPassword = bodyData.password;
    const OTP = Math.floor(100000 + Math.random() * 900000);
    try {
      const findUser = await this.prismaService.user.findUnique({
        where: {
          email: email.email,
        }
      });
      if (findUser) {
        this.cacheManegerService.addToCache({
          email: email.email,
          otp: OTP,
          verification: false
        });
        const emailSend = await this.sendEmailService.sendEmail();
        return emailSend;
      }
    } catch (error) {
      throw new HttpException(
        { msg: 'Username Not found!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async forgotOtpVerification(otp: { otp: number }) {
    try {
      const cacheData: any = await this.cacheManegerService.getData();
      const getOtpFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.otp;
      };
      const cacheOtp: number = await getOtpFromCache(cacheData);
      const cacheAllData: any = {
        email: cacheData.email,
        verification: true
      }
      if (cacheOtp == otp.otp) {
        this.cacheManegerService.addToCache(cacheAllData)
        return "Otp Verify Successfully!"
      } else {
        throw new HttpException(
          { msg: 'Invalid Otp!' },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        { msg: 'Try Again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async changePassword(newPassword: { newPassword: string }) {
    try {
      const cacheData: any = await this.cacheManegerService.getData();
      const getEmailFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.email;
      };
      const getVerifyFromCache = (cacheData: CacheManegerDto) => {
        return cacheData.verification;
      };
      const cacheEmail: string = await getEmailFromCache(cacheData);
      const cacheVerification: boolean = await getVerifyFromCache(cacheData);

      if (cacheVerification) {
        const userData: RegisterUserDto = await this.prismaService.user.findUnique({
          where: {
            email: cacheEmail
          }
        })

        const userDataModify: any = {
          email: userData.email,
          password: await this.bcryptService.plainToHash(newPassword.newPassword)
        }
        
        const updatePassword = await this.prismaService.user.update({
          where: {
            email: userData.email,
          },
          data: { ...userDataModify },
        })

        if(updatePassword){
          return "Password Update Succefully"
        }else{
          throw new HttpException(
            { msg: 'Password Update Failed!' },
            HttpStatus.FORBIDDEN,
          );
        }
      } else {
        throw new HttpException(
          { msg: 'User Not Verify!' },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (error) {
      throw new HttpException(
        { msg: 'Try Again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
