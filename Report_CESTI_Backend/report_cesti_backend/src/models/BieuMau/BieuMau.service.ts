import { Injectable, Dependencies } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { BieuMau } from './BieuMau.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaginationOptionsInterface, Pagination } from '../Paginate';

@Injectable()
export class BieuMauService {
  constructor(@InjectRepository(BieuMau)
  private readonly BieuMauRepository: Repository<BieuMau>,) {
  }

  findAll() {
    return this.BieuMauRepository.find();
  }

  findOne(maBieuMau) {
    return this.BieuMauRepository.findOne({where: {maBieuMau}, relations: {chiTieu: true, chiSoAr: true} });
  }
  async paginationWithParams(
    options: PaginationOptionsInterface,
    chi_tieu: number
  ): Promise<Pagination<BieuMau>> {
    const [results, total] = await this.BieuMauRepository.
                                        createQueryBuilder()
                                        .select()
                                        .where('BieuMau.tenBieuMau ILIKE :tenBieuMau', {tenBieuMau: `%${options.params["tenBieuMau"] ? options.params["tenBieuMau"] : ""}%`})
                                        .andWhere(chi_tieu != -1 ? 'BieuMau.chiTieuMaChiTieu = :chi_tieu' : "true", {chi_tieu})
                                        .orderBy('BieuMau.ngayTao', "DESC")
                                        .offset(options.page  * options.limit)
                                        .limit(options.limit).getManyAndCount()
    const all_names_result = await this.BieuMauRepository.find({
      select: ['maBieuMau', 'tenBieuMau']
    });
    const all_names = all_names_result.map(e => e.tenBieuMau)
    return new Pagination<BieuMau>({
      results,
      total,
      all_names
    });
  }
  async create(BieuMau: BieuMau): Promise<BieuMau>{
    return await this.BieuMauRepository.save(BieuMau)
  }
  async update(BieuMau: BieuMau): Promise<UpdateResult>{
    return await this.BieuMauRepository.update(BieuMau.maBieuMau, BieuMau)
  }
  async delete(maBieuMau): Promise<DeleteResult> {
    return await this.BieuMauRepository.delete(maBieuMau);
  }
}