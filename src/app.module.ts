import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from 'src/reports/reports.module';
import { UsersModule } from 'src/users/users.module';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db.sqlite',
        entities: [User,Report],
        synchronize: true
    }) //configuring database for the root module so that other modules can use this
        ,UsersModule,ReportsModule],
    controllers:[],
    providers:[]
})
export class AppModule {}
