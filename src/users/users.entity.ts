import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    @Exclude() //Exclude this field from response
    password:string;

    //runs this function everytime after user is inserted in database
    @AfterInsert()
    logInserted(){
        console.log("Inserted user with id",this.id);
    }

    //runs this function everytime after user is removed in database
    @AfterRemove()
    logRemoved(){
        console.log("Removed user with id",this.id);
    }

    //runs this function everytime after user is updated in database
    @AfterUpdate()
    logUpdate(){
        console.log("Updated user with id",this.id);
    }
}