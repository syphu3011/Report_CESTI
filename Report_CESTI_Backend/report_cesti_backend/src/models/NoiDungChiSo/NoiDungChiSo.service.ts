import { Injectable, Dependencies } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { NoiDungChiSo } from './NoiDungChiSo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import uniqueArray from 'src/utils/uniqueArray';

@Injectable()
export class NoiDungChiSoService {
  constructor(@InjectRepository(NoiDungChiSo)
  private readonly NoiDungChiSoRepository: Repository<NoiDungChiSo>,) {
  }

  findAll() {
    return this.NoiDungChiSoRepository.find({relations: {tienGiaTri: true, hauGiaTri: true}});
  }

  findOne(maNoiDungChiSo) {
    return this.NoiDungChiSoRepository.findOne({where: {maNoiDungChiSo}, relations: {
      tienGiaTri: true, 
      hauGiaTri: true
    }});
  }

  async findAllParameter() {
    const allParams = await this.NoiDungChiSoRepository.find({select:["tienGiaTri", "tienTo", "loaiGiaTri", "donVi"]})
    return {
      tienTo: uniqueArray(allParams.map(e => e.tienTo)),
      loaiGiaTri: uniqueArray(allParams.map(e => e.loaiGiaTri)),
      donVi: uniqueArray(allParams.map(e => e.donVi))
    }
  }

  async create(NoiDungChiSo: NoiDungChiSo): Promise<NoiDungChiSo>{
    return await this.NoiDungChiSoRepository.save(NoiDungChiSo)
  }
  async update(NoiDungChiSo: NoiDungChiSo): Promise<UpdateResult>{
    return await this.NoiDungChiSoRepository.update(NoiDungChiSo.maNoiDungChiSo, NoiDungChiSo)
  }
  async delete(maNoiDungChiSo): Promise<DeleteResult> {
    return await this.NoiDungChiSoRepository.delete(maNoiDungChiSo);
  }
  async changePos(noiDungChiSo: NoiDungChiSo, newTienGiaTri, newHauGiaTri, oldHauGiaTri) {
    console.log(noiDungChiSo)
    const oldTienGiaTri = noiDungChiSo.tienGiaTri
    oldHauGiaTri["tienGiaTri"] = oldTienGiaTri
    noiDungChiSo.tienGiaTri = null
    newHauGiaTri["tienGiaTri"] = noiDungChiSo
    let rowAffected = 0
    rowAffected += (await this.NoiDungChiSoRepository.update(noiDungChiSo.maNoiDungChiSo, noiDungChiSo)).affected
    rowAffected += (await this.NoiDungChiSoRepository.update(oldHauGiaTri.maNoiDungChiSo, oldHauGiaTri)).affected
    if (newHauGiaTri.maNoiDungChiSo != null) {
      rowAffected += (await this.NoiDungChiSoRepository.update(newHauGiaTri.maNoiDungChiSo, newHauGiaTri)).affected
    }
    noiDungChiSo.tienGiaTri = newTienGiaTri

    const rs = await this.NoiDungChiSoRepository.update(oldHauGiaTri.maNoiDungChiSo, oldHauGiaTri)
    rs.affected += rowAffected
    return rs
  }
}