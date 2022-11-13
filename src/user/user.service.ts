import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prismaService:PrismaService){}

    // Local Auth 
    async validateUserLocal(email:string,password:string){
        const user = await this.prismaService.user.findUnique({
          where:{
            email:email
          }
        })

        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }




}
