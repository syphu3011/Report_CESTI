import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChiSoService } from './ChiSo.service';
import { ChiSoController } from './ChiSo.controller';
import { ChiSo } from './ChiSo.entity';
import { BieuMauService } from '../BieuMau/BieuMau.service';
import { BieuMau } from '../BieuMau/BieuMau.entity';
import { GiaTriChiSo } from '../GiaTriChiSo/GiaTriChiSo.entity';
import { NoiDungChiSo } from '../NoiDungChiSo/NoiDungChiSo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChiSo, BieuMau, GiaTriChiSo, NoiDungChiSo])],
  providers: [ChiSoService],
  controllers: [ChiSoController],
})
export class ChiSoModule {}