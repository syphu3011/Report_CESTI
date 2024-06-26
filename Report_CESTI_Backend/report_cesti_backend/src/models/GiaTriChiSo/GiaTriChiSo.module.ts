import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiaTriChiSoService } from './GiaTriChiSo.service';
import { GiaTriChiSoController } from './GiaTriChiSo.controller';
import { GiaTriChiSo } from './GiaTriChiSo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiaTriChiSo])],
  providers: [GiaTriChiSoService],
  controllers: [GiaTriChiSoController],
})
export class GiaTriChiSoModule {}