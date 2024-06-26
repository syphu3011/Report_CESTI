import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { ChiSo } from './ChiSo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Pagination, PaginationOptionsInterface } from '../Paginate';
import { BieuMau } from '../BieuMau/BieuMau.entity';
import { GiaTriChiSo } from '../GiaTriChiSo/GiaTriChiSo.entity';
import { NoiDungChiSo } from '../NoiDungChiSo/NoiDungChiSo.entity';

@Injectable()
export class ChiSoService {
  constructor(@InjectRepository(ChiSo)
  private readonly ChiSoRepository: Repository<ChiSo>,
  @InjectRepository(BieuMau)
  private readonly BieuMauRepository: Repository<BieuMau>,
  @InjectRepository(GiaTriChiSo)
  private readonly GiaTriChiSoRepository: Repository<GiaTriChiSo>,
  @InjectRepository(NoiDungChiSo)
  private readonly NoiDungChiSoRepository: Repository<NoiDungChiSo>) {
  }

  findAll() {
    return this.ChiSoRepository.find({relations: {chiSoCha: true,bieuMau: true}});
  }

  

  findOne(maChiSo) {
    return this.ChiSoRepository.findOne({ where: {maChiSo}, relations: {bieuMau: true, chiSoCha: true, chiSoConAr: true, giaTriChiSoAr: true, noiDungChiSoAr: true}});
  }
  
  async paginationWithParams(
    options: PaginationOptionsInterface,
    bieu_mau?: number,
    chi_so?: number
  ): Promise<Pagination<ChiSo>> {
    console.log(bieu_mau)
    if (bieu_mau && chi_so) throw new NotFoundException('Page not found')
    const [results, total] = await this.ChiSoRepository.
                                        createQueryBuilder()
                                        .select()
                                        .where(bieu_mau ? 'ChiSo.bieuMauMaBieuMau = :bieu_mau' : (chi_so ? "true" : "false"), {bieu_mau})
                                        .andWhere(bieu_mau ? '"ChiSo"."chiSoCha" IS NULL' : "true")
                                        .andWhere(chi_so ? 'ChiSo.chiSoCha = :chi_so' : (bieu_mau ? "true" : "false"), {chi_so})
                                        .leftJoinAndSelect('ChiSo.chiSoCha', 'chi_so')
                                        .orderBy('ChiSo.ngayTao', "DESC")
                                        .offset(options.page  * options.limit)
                                        .limit(options.limit)
                                        .getManyAndCount()
    const bieu_mau_return = await this.BieuMauRepository.find({
      select: ["maBieuMau", "tenBieuMau"]
    })
    const chi_so_cha_return = await this.ChiSoRepository.find({
      select: {
        maChiSo: true, 
        noiDungDonGian: true,
        bieuMau: {
          maBieuMau: true
        }
      },
      relations: {bieuMau: true}
    })
    const custom = {
      bieuMau: bieu_mau_return,
      chiSo: chi_so_cha_return
    }
    return new Pagination<ChiSo>({
      results,
      total,
      custom
    });
  }

  async create(chiSo: ChiSo): Promise<ChiSo>{
    chiSo["viTri"] = (await this.ChiSoRepository.createQueryBuilder().select("MAX(ChiSo.viTri)", "max").getRawOne()).max + 1
    if (chiSo["noiDungChiSoAr"] && chiSo.loai == "Chỉ số thường") {
      chiSo["noiDungDonGian"] = ""
      chiSo["noiDungChiSoAr"].forEach(e => {
        for (const _e in e) {
          if (e[_e] != undefined) {
            chiSo["noiDungDonGian"] += " "+e[_e]
          }
        }
        chiSo["noiDungDonGian"] += "."
      })
      chiSo["noiDungDonGian"] = chiSo["noiDungDonGian"].trim()
    }
    else {
      if (chiSo["noiDungChiSoAr"]) {
        delete chiSo["noiDungChiSoAr"]
      }
    }

    if (chiSo["giaTriChiSoAr"] && chiSo.loai == "Kết quả") {
      chiSo["giaTriDonGian"] = ""
      chiSo["giaTriChiSoAr"].forEach(e => {
        for (const _e in e) {
          if (e[_e] != undefined) {
            chiSo["giaTriDonGian"] += " "+e[_e]
          }
        }
        chiSo["giaTriDonGian"] += "."
      })
      chiSo["giaTriDonGian"] = chiSo["giaTriDonGian"].trim()
    }
    else {
      if (chiSo["giaTriChiSoAr"]) {
        delete chiSo["giaTriChiSoAr"]
      }
    }

    const chiSoAdded = await this.ChiSoRepository.save(chiSo)
    let i = 0
    let savePrev: any

    if (chiSo["giaTriChiSoAr"]) {
      for (const e of chiSo["giaTriChiSoAr"]) {
        e["chiSo"] = {maChiSo: chiSoAdded.maChiSo} as any
        if (i > 0) {
          e["tienGiaTri"] = {maGiaTriChiSo: savePrev.maGiaTriChiSo} as any
        }
        savePrev = await this.GiaTriChiSoRepository.save(e)
        i++
      }
    }

    i = 0
    if (chiSo["noiDungChiSoAr"]) {
      for (const e of chiSo["noiDungChiSoAr"]) {
        e["chiSo"] = {maChiSo: chiSoAdded.maChiSo} as any
        if (i > 0) {
          e["tienGiaTri"] = {maNoiDungChiSo: savePrev.maNoiDungChiSo} as any
        }
        savePrev = await this.NoiDungChiSoRepository.save(e)
        i++
      }
    }
    return chiSoAdded
  }
  async update(chiSo: ChiSo): Promise<UpdateResult>{
    if (chiSo["noiDungChiSoAr"] && chiSo.loai == "Chỉ số thường") {
      chiSo["noiDungDonGian"] = ""
      chiSo["noiDungChiSoAr"].forEach(e => {
        for (const _e in e) {
          if (e[_e] != undefined) {
            chiSo["noiDungDonGian"] += " "+e[_e]
          }
        }
        chiSo["noiDungDonGian"] += "."
      })
      chiSo["noiDungDonGian"] = chiSo["noiDungDonGian"].trim()
    }
    else {
      if (chiSo["noiDungChiSoAr"]) {
        delete chiSo["noiDungChiSoAr"]
      }
    }

    if (chiSo["giaTriChiSoAr"] && chiSo.loai == "Kết quả") {
      chiSo["giaTriDonGian"] = ""
      chiSo["giaTriChiSoAr"].forEach(e => {
        for (const _e in e) {
          if (e[_e] != undefined) {
            chiSo["giaTriDonGian"] += " "+e[_e]
          }
        }
        chiSo["giaTriDonGian"] += "."
      })
      chiSo["giaTriDonGian"] = chiSo["giaTriDonGian"].trim()
    }
    else {
      if (chiSo["giaTriChiSoAr"]) {
        delete chiSo["giaTriChiSoAr"]
      }
    }

    let i = 0
    let savePrev: any

    if (chiSo["giaTriChiSoAr"]) {
      for (const e of chiSo["giaTriChiSoAr"]) {
        e["chiSo"] = {maChiSo: chiSo.maChiSo} as any
        if (i > 0) {
          e["tienGiaTri"] = {maGiaTriChiSo: savePrev.maGiaTriChiSo} as any
        }
        savePrev = e
        this.GiaTriChiSoRepository.update(e.maGiaTriChiSo, e)
        i++
      }
    }

    i = 0
    if (chiSo["noiDungChiSoAr"]) {
      for (const e of chiSo["noiDungChiSoAr"]) {
        e["chiSo"] = {maChiSo: chiSo.maChiSo} as any
        if (i > 0) {
          e["tienGiaTri"] = {maNoiDungChiSo: savePrev.maNoiDungChiSo} as any
        }
        savePrev = e
        this.NoiDungChiSoRepository.update(e.maNoiDungChiSo, e)
        i++
      }
    }
    delete chiSo["noiDungChiSoAr"]
    delete chiSo["giaTriChiSoAr"]
    const chiSoUpdated = await this.ChiSoRepository.update(chiSo.maChiSo,chiSo)
    return chiSoUpdated
  }
  async delete(maChiSo): Promise<DeleteResult> {
    return await this.ChiSoRepository.delete(maChiSo);
  }
}