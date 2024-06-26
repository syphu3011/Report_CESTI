import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './models/user/user.entity';
import { ConfigModule } from '@nestjs/config';
import config from './typeorm/typeorm.config'
import { UsersController } from './models/user/users.controller';
import { UsersModule } from './models/user/users.module';
import { AppController } from './app.controller';
import { AutoLoadModules } from './AutoLoadModules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config]
    }),
    TypeOrmModule.forRoot(config() as TypeOrmModuleOptions), 
    AutoLoadModules.register()
  ],
})
export class AppModule {}