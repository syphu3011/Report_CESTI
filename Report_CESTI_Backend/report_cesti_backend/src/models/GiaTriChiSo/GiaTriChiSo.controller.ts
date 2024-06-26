import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GiaTriChiSoService } from './GiaTriChiSo.service'
import { GiaTriChiSo } from './GiaTriChiSo.entity'


@Controller('gia_tri_chi_so')
export class GiaTriChiSoController {
  constructor(private readonly GiaTriChiSoService: GiaTriChiSoService) {

  }

  @Get()
  findAll(): Promise<GiaTriChiSo[]> {
    return this.GiaTriChiSoService.findAll()
  }

  @Get('cac_thanh_phan')
  allParams() {
    return this.GiaTriChiSoService.findAllParameter();
  }
  
  @Get(':maGiaTriChiSo')
  get(@Param() params) {
    return this.GiaTriChiSoService.findOne(params.maGiaTriChiSo);
  }

  @Post()
  create(@Body() GiaTriChiSo: GiaTriChiSo) {
    return this.GiaTriChiSoService.create(GiaTriChiSo);
  }

  @Put()
  update(@Body() GiaTriChiSo: GiaTriChiSo) {
    return this.GiaTriChiSoService.update(GiaTriChiSo);
  }

  @Put("doi_vi_tri")
  changePos(@Body("giaTriChiSo") giaTriChiSo: GiaTriChiSo, 
            @Body("newTienGiaTri") newTienGiaTri: GiaTriChiSo,
            @Body("newHauGiaTri") newHauGiaTri: GiaTriChiSo,
            @Body("oldHauGiaTri") oldHauGiaTri: GiaTriChiSo) {
    return this.GiaTriChiSoService.changePos(giaTriChiSo, newTienGiaTri, newHauGiaTri, oldHauGiaTri)
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.GiaTriChiSoService.delete(params.id);
  }
}

