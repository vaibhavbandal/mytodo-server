import { Role } from "@prisma/client"
import {IsEmail, IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class RegisterUserDto {
    @IsEmail()
    @ApiProperty()
    email : string
    
    @IsString()
    @ApiProperty()
    password : string

}