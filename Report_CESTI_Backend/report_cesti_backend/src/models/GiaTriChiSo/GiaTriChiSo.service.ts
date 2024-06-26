import { Injectable, Dependencies } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { GiaTriChiSo } from './GiaTriChiSo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import uniqueArray from 'src/utils/uniqueArray';

@Injectable()
export class GiaTriChiSoService {
  constructor(@InjectRepository(GiaTriChiSo)
  private readonly GiaTriChiSoRepository: Repository<GiaTriChiSo>,) {
  }

  findAll() {
    return this.GiaTriChiSoRepository.find({relations: {
      tienGiaTri: true, 
      hauGiaTri: true
    }});
  }

  findOne(maGiaTriChiSo) {
    return this.GiaTriChiSoRepository.findOne({where: {maGiaTriChiSo}, relations: {
      tienGiaTri: true, 
      hauGiaTri: true
    }});
  }

  async findAllParameter() {
    const allParams = await this.GiaTriChiSoRepository.find({select:["tienGiaTri", "tienTo", "loaiGiaTri", "donVi"]})
    return {
      tienGiaTri: uniqueArray(allParams.map(e => e.tienGiaTri)),
      tienTo: uniqueArray(allParams.map(e => e.tienTo)),
      loaiGiaTri: uniqueArray(allParams.map(e => e.loaiGiaTri)),
      donVi: uniqueArray(allParams.map(e => e.donVi))
    }
  }

  async create(GiaTriChiSo: GiaTriChiSo): Promise<GiaTriChiSo>{
    return await this.GiaTriChiSoRepository.save(GiaTriChiSo)
  }
  async update(GiaTriChiSo: GiaTriChiSo): Promise<UpdateResult>{
    return await this.GiaTriChiSoRepository.update(GiaTriChiSo.maGiaTriChiSo, GiaTriChiSo)
  }
  async delete(maGiaTriChiSo): Promise<DeleteResult> {
    return await this.GiaTriChiSoRepository.delete(maGiaTriChiSo);
  }
  async changePos(giaTriChiSo: GiaTriChiSo, newTienGiaTri, newHauGiaTri, oldHauGiaTri) {
    console.log(giaTriChiSo)
    const oldTienGiaTri = giaTriChiSo.tienGiaTri
    oldHauGiaTri["tienGiaTri"] = oldTienGiaTri
    giaTriChiSo.tienGiaTri = null
    newHauGiaTri["tienGiaTri"] = giaTriChiSo
    let rowAffected = 0
    rowAffected += (await this.GiaTriChiSoRepository.update(giaTriChiSo.maGiaTriChiSo, giaTriChiSo)).affected
    rowAffected += (await this.GiaTriChiSoRepository.update(oldHauGiaTri.maGiaTriChiSo, oldHauGiaTri)).affected
    if (newHauGiaTri.maGiaTriChiSo != null) {
      rowAffected += (await this.GiaTriChiSoRepository.update(newHauGiaTri.maGiaTriChiSo, newHauGiaTri)).affected
    }
    giaTriChiSo.tienGiaTri = newTienGiaTri

    const rs = await this.GiaTriChiSoRepository.update(oldHauGiaTri.maGiaTriChiSo, oldHauGiaTri)
    rs.affected += rowAffected
    return rs
  }
}