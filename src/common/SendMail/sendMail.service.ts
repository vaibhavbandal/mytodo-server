import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CacheManegerService } from '../cacheManeger/cache.service';
import { CacheManegerDto } from '../cacheManeger/cacheManegerDto';

@Injectable()
export class SendEmailService {
  constructor(private readonly cacheManagerService: CacheManegerService) {}
  // const getCacheData =(cacheData: CacheManegerDto)=> cacheData
  sendEmail = async (): Promise<string> => {
    const cacheData: any = await this.cacheManagerService.getData();

    const userEmail = (cacheData: CacheManegerDto) => {
      return cacheData.email;
    };

    const userOtp = (cacheData: CacheManegerDto) => {
      return cacheData.otp;
    };

    const userEmailFromCache: string = await userEmail(cacheData);
    const userOtpFromCache: number = await userOtp(cacheData);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const mailDetails = {
      from: 'mytodos@gmail.com',
      to: `${userEmailFromCache}`,
      subject: 'MyToDos Email Authentification ',
      html: `<h2>Verify your email Address</h2>
      <p style="font-weight:bold padding-left:2px;font-size: 2em;">Hey sir<br>
      We received a request to access your Google Account through <strong>${userEmailFromCache}</strong>. <br>Your Google verification code is:
      <br><h2>${userOtpFromCache}</h2>
      <strong>Yours MyTodos</strong><br>
      The Account team</strong>`,
    };
    try {
      await transporter.sendMail(mailDetails);
      return 'Email send successfully';
    } catch (e) {
      console.log(e);
      return 'Email Failed';
    }
  };
}
