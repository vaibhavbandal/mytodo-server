import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prismaService:PrismaService,
      private readonly bcryptService : BcryptService){}

    // Local Auth 
    async validateUserLocal(email:string,password:string){
        const user = await this.prismaService.user.findUnique({
          where:{
            email:email
          }
        })

        const isPassword = await this.bcryptService.compaireHash(password, user.password)
        if(isPassword){
          const {password, ...result} = user;
            return result;
        }
  
        // if (user && user.password === password) {
        //     const {password, ...result} = user;
        //     return result;
        // }
        return null;
    }




}
