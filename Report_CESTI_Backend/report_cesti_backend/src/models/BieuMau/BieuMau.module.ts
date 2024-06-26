import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BieuMauService } from './BieuMau.service';
import { BieuMauController } from './BieuMau.controller';
import { BieuMau } from './BieuMau.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BieuMau])],
  providers: [BieuMauService],
  controllers: [BieuMauController],
})
export class BieuMauModule {}