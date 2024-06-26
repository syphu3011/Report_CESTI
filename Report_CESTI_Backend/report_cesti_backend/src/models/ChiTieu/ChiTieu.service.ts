import { Injectable, Dependencies } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { ChiTieu } from './ChiTieu.entity';
import { Between, DeleteResult, FindOptionsWhere, MoreThanOrEqual, Repository, UpdateResult } from 'typeorm';
import { PaginationOptionsInterface, Pagination } from '../Paginate';

@Injectable()
export class ChiTieuService {
  constructor(@InjectRepository(ChiTieu)
  private readonly ChiTieuRepository: Repository<ChiTieu>,) {
  }

  findAll() {
    return this.ChiTieuRepository.find();
  }
  
  async pagination(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<ChiTieu>> {
    const condition = {}
    if (options.params["tuBatDau"]) {
      condition["batDau"] = Between(options.params["tuBatDau"], options.params["denBatDau"]),
      condition["ketThuc"] = Between(options.params["tuKetThuc"], options.params["denKetThuc"])
      if (options.params["tenChiTieu"] != "") {
        condition["tenChiTieu"] = options.params["tenChiTieu"]
      }
    }
    const [results, total] = await this.ChiTieuRepository.findAndCount({
      where: condition,
      order: {
        ketThuc: "ASC"
      },
      take: options.limit,
      skip: options.page  * options.limit, // think this needs to be page * limit
    });
    const all_names_result = await this.ChiTieuRepository.find({
      select: ['maChiTieu', 'tenChiTieu']
    });
    let all_names = all_names_result.map(e => {
      return {
      maChiTieu: e.maChiTieu,
      tenChiTieu: e.tenChiTieu
    }})
    return new Pagination<ChiTieu>({
      results,
      total,
      all_names: all_names
    });
  }
  async paginationWithParams(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<ChiTieu>> {
    const [results, total] = await this.ChiTieuRepository.
                                        createQueryBuilder()
                                        .select()
                                        .where(options.params["tuBatDau"] ? 'ChiTieu.batDau >= :tuBatDau' : "TRUE", {tuBatDau: options.params["tuBatDau"]})
                                        .andWhere(options.params["tuKetThuc"] ? 'ChiTieu.ketThuc >= :tuKetThuc' : "TRUE", {tuKetThuc: options.params["tuKetThuc"]})
                                        .andWhere(options.params["denBatDau"] ? 'ChiTieu.batDau <= :denBatDau' : "TRUE", {denBatDau: options.params["denBatDau"]})
                                        .andWhere(options.params["denKetThuc"] ? 'ChiTieu.ketThuc <= :denKetThuc' : "TRUE", {denKetThuc: options.params["denKetThuc"]})
                                        .andWhere('ChiTieu.tenChiTieu ILIKE :tenChiTieu', {tenChiTieu: `%${options.params["tenChiTieu"] ? options.params["tenChiTieu"] : ""}%`})
                                        .orderBy('ChiTieu.ketThuc', "ASC")
                                        .offset(options.page  * options.limit)
                                        .limit(options.limit).getManyAndCount()
    const all_names_result = await this.ChiTieuRepository.find({
      select: ['maChiTieu', 'tenChiTieu']
    });
    let all_names = all_names_result.map(e => {
      return {
      maChiTieu: e.maChiTieu,
      tenChiTieu: e.tenChiTieu
    }})
    return new Pagination<ChiTieu>({
      results,
      total,
      all_names: all_names
    });
  }

  findOne(maChiTieu) {
    return this.ChiTieuRepository.findOne({where: {maChiTieu}, relations: {bieuMauAr: true}});
  }
  async create(chiTieu: ChiTieu): Promise<ChiTieu>{
    // console.log("alo", chiTieu)
    return await this.ChiTieuRepository.save(chiTieu)
  }
  async update(chiTieu: ChiTieu): Promise<UpdateResult>{
    return await this.ChiTieuRepository.update(chiTieu.maChiTieu, chiTieu)
  }
  async delete(maChiTieu): Promise<DeleteResult> {
    return await this.ChiTieuRepository.delete(maChiTieu);
  }
}