import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ChiTieu } from '../ChiTieu/ChiTieu.entity';
import { BieuMau } from '../BieuMau/BieuMau.entity';
import { NoiDungChiSo } from '../NoiDungChiSo/NoiDungChiSo.entity';
import { GiaTriChiSo } from '../GiaTriChiSo/GiaTriChiSo.entity';

const now = new Date()

@Entity()
export class ChiSo {
  @PrimaryGeneratedColumn("increment")
  maChiSo: number;

  @ManyToOne(() => BieuMau, (bieuMau) => bieuMau.chiSoAr)
  bieuMau: BieuMau
  
  @ManyToOne (() => ChiSo, (chiSo) => chiSo.chiSoConAr, {cascade: true, onDelete: "CASCADE"})
  @JoinColumn({ name: "chiSoCha" })
  chiSoCha: ChiSo

  @OneToMany (() => ChiSo, (chiSo) => chiSo.chiSoCha)
  chiSoConAr: ChiSo[]

  @OneToMany (() => NoiDungChiSo, (noiDungChiSo) => noiDungChiSo.chiSo)
  noiDungChiSoAr: NoiDungChiSo[]

  @OneToMany (() => GiaTriChiSo, (GiaTriChiSo) => GiaTriChiSo.chiSo)
  giaTriChiSoAr: GiaTriChiSo[]

  @Column({nullable: true})
  noiDungDonGian: string

  @Column({nullable: true})
  giaTriDonGian: string

  @Column({type: "enum",enum: ["Đơn giản", "Phức tạp"], default: "Phức tạp"})
  loaiNoiDung: string

  @Column({nullable: true})
  noiDungThayThePhongBan: string

  @Column({type: "enum", enum: ["Kết quả", "Chỉ số thường"], default: "Chỉ số thường"})
  loai: string

  @Column({type: "enum", enum: [1,2,3,4,5,6,7,8,9,10,11,12], default: (now).getMonth() + 1})
  thang: number

  @Column({type: "enum", enum: [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1], default: now.getFullYear()})
  nam: number

  @Column()
  viTri: number
  
  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayTao: string;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayCapNhat: string;
  @Column({nullable: true})
  trangThai: string
}