import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BieuMauService } from './BieuMau.service'
import { BieuMau } from './BieuMau.entity'
import { Pagination } from '../Paginate';


@Controller('bieu_mau')
export class BieuMauController {
  constructor(private readonly BieuMauService: BieuMauService) {

  }

  @Get()
  findAll(): Promise<BieuMau[]> {
    return this.BieuMauService.findAll()
  }
  @Get('/paginate')
  async paginateAll(@Query('limit') limit: number,
                    @Query('page') page: number,
                    @Query('chi_tieu') chi_tieu: number,
                    @Query('params') params: string): Promise<Pagination<BieuMau>> {
                      // console.log("hihi",limit)
    return await this.BieuMauService.paginationWithParams({
      limit: limit ? limit : 10,
      page: page ? page : 0,
      params: JSON.parse(params)
    }, chi_tieu);
  }
  @Get(':maBieuMau')
  get(@Param() params) {
    return this.BieuMauService.findOne(params.maBieuMau);
  }

  @Post()
  create(@Body() BieuMau: BieuMau) {
    return this.BieuMauService.create(BieuMau);
  }

  @Put()
  update(@Body() BieuMau: BieuMau) {
    return this.BieuMauService.update(BieuMau);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.BieuMauService.delete(params.id);
  }
}

