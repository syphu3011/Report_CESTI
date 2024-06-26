import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoiDungChiSoService } from './NoiDungChiSo.service';
import { NoiDungChiSoController } from './NoiDungChiSo.controller';
import { NoiDungChiSo } from './NoiDungChiSo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoiDungChiSo])],
  providers: [NoiDungChiSoService],
  controllers: [NoiDungChiSoController],
})
export class NoiDungChiSoModule {}