import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    //Dependency Injection for service
    constructor(private userService:UsersService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){ //using userDto to validate the class and also the type of body
        this.userService.create(body.email,body.password);
    }

    @UseInterceptors(ClassSerializerInterceptor) //used to exclude field from response
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string ,@Body() body:updateUserDto){
        return this.userService.update(parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }

}
