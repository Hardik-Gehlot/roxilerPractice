import { IsEmail, IsString } from "class-validator";

//use to validate class
export class CreateUserDto{
    @IsEmail()
    email:string;
    @IsString()
    password:string;
}