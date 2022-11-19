import { Role } from "@prisma/client"
import {IsEmail, IsString} from 'class-validator'

export class RegisterUserDto {
    @IsEmail()
    email : string
    
    @IsString()
    password : string

}