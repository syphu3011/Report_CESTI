import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ChiTieuService } from './ChiTieu.service'
import { ChiTieu } from './ChiTieu.entity'
import { Pagination } from '../Paginate';


@Controller('chi_tieu')
export class ChiTieuController {
  constructor(private readonly ChiTieuService: ChiTieuService) {

  }

  @Get()
  findAll(): Promise<ChiTieu[]> {
    return this.ChiTieuService.findAll()
  }

  @Get('/paginate')
  async paginateAll(@Query('limit') limit: number,
                    @Query('page') page: number,
                    @Query('params') params: string): Promise<Pagination<ChiTieu>> {
                      // console.log("hihi",limit)
    return await this.ChiTieuService.paginationWithParams({
      limit: limit ? limit : 10,
      page: page ? page : 0,
      params: JSON.parse(params)
    });
  }


  @Get(':maChiTieu')
  get(@Param() params) {
    return this.ChiTieuService.findOne(params.maChiTieu);
  }

  @Post()
  create(@Body() ChiTieu: ChiTieu) {
    return this.ChiTieuService.create(ChiTieu);
  }

  @Put()
  update(@Body() ChiTieu: ChiTieu) {
    console.log("hello", ChiTieu)
    return this.ChiTieuService.update(ChiTieu);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.ChiTieuService.delete(params.id);
  }
}

