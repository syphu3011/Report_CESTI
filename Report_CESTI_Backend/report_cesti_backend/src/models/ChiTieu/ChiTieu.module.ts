import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChiTieuService } from './ChiTieu.service';
import { ChiTieuController } from './ChiTieu.controller';
import { ChiTieu } from './ChiTieu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChiTieu])],
  providers: [ChiTieuService],
  controllers: [ChiTieuController],
})
export class ChiTieuModule {}