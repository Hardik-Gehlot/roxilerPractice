import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    create(email:string,password:string){
        //we first create an instance of user then we will save
        //create method is used to create an instance with checking validation like IsString or IsEmail or not
        //there is one more use case is if we directly call save method it saves to database but hooks will not be executed
        //hooks like @AfterInserted or @AfterUpdate will not be excuted and make it hard to debug the code
        const user = this.repo.create({email,password});
        return this.repo.save(user);

        //This is also correct to directly save this to db
        // return this.repo.save({email,password});


        //Hooks are called only with save and remove method there for insert(),update(),and delete() do the job but
        //not call the hooks
    }

    findOne(id:number){
        return this.repo.findOneBy({id});
    }
    find(email:string){
        return this.repo.find({where:{email}});
    }
    //Partial defines that attrs can be any object that has null or 1 or all the properties of User entity
    //it means there is no tight boundation on type it can have any property from User entity
    async update(id:number, attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('User not found');
        }
        //assign updated values from attrs to the user object
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('User not found');
        }
        return this.repo.remove(user);
    }

}
