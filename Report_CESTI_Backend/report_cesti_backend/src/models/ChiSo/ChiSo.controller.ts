import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ChiSoService } from './ChiSo.service'
import { ChiSo } from './ChiSo.entity'
import { Pagination } from '../Paginate';


@Controller('chi_so')
export class ChiSoController {
  constructor(private readonly ChiSoService: ChiSoService) {

  }

  @Get()
  findAll(): Promise<ChiSo[]> {
    return this.ChiSoService.findAll()
  }

  @Get('/paginate')
  async paginateAll(@Query('limit') limit: number,
                    @Query('page') page: number,
                    @Query('bieu_mau') bieu_mau: number,
                    @Query('chi_so') chi_so: number,
                    @Query('params') params: string): Promise<Pagination<ChiSo>> {
    return await this.ChiSoService.paginationWithParams({
      limit: limit ? limit : 10,
      page: page ? page : 0,
      params: JSON.parse(params)
    }, bieu_mau, chi_so);
  }
  
  @Get(':maChiSo')
  get(@Param() params) {
    return this.ChiSoService.findOne(params.maChiSo);
  }

  @Post()
  create(@Body() chiSo: ChiSo) {
    return this.ChiSoService.create(chiSo);
  }

  @Put()
  update(@Body() chiSo: ChiSo) {
    console.log("hello", chiSo)
    return this.ChiSoService.update(chiSo);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.ChiSoService.delete(params.id);
  }
}

