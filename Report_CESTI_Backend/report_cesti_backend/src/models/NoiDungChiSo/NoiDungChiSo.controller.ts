import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NoiDungChiSoService } from './NoiDungChiSo.service'
import { NoiDungChiSo } from './NoiDungChiSo.entity'


@Controller('noi_dung_chi_so')
export class NoiDungChiSoController {
  constructor(private readonly NoiDungChiSoService: NoiDungChiSoService) {

  }

  @Get()
  findAll(): Promise<NoiDungChiSo[]> {
    return this.NoiDungChiSoService.findAll()
  }

  @Get('cac_thanh_phan')
  allParams() {
    return this.NoiDungChiSoService.findAllParameter();
  }
  
  @Get(':maNoiDungChiSo')
  get(@Param() params) {
    return this.NoiDungChiSoService.findOne(params.maNoiDungChiSo);
  }

  @Post()
  create(@Body() NoiDungChiSo: NoiDungChiSo) {
    return this.NoiDungChiSoService.create(NoiDungChiSo);
  }

  @Put()
  update(@Body() NoiDungChiSo: NoiDungChiSo) {
    return this.NoiDungChiSoService.update(NoiDungChiSo);
  }

  @Put("doi_vi_tri")
  changePos(@Body("noiDungChiSo") noiDungChiSo: NoiDungChiSo, 
            @Body("newTienGiaTri") newTienGiaTri: NoiDungChiSo,
            @Body("newHauGiaTri") newHauGiaTri: NoiDungChiSo,
            @Body("oldHauGiaTri") oldHauGiaTri: NoiDungChiSo) {
    return this.NoiDungChiSoService.changePos(noiDungChiSo, newTienGiaTri, newHauGiaTri, oldHauGiaTri)
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.NoiDungChiSoService.delete(params.id);
  }

}

