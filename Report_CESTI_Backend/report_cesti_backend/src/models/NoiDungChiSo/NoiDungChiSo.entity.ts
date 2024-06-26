import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ChiSo } from '../ChiSo/ChiSo.entity';

@Entity()
export class NoiDungChiSo {
  @PrimaryGeneratedColumn("increment")
  maNoiDungChiSo: number;

  @ManyToOne(() => ChiSo, (chiSo) => chiSo.noiDungChiSoAr,{nullable: false, cascade: true, onDelete: "CASCADE"})
  chiSo: ChiSo;

  @OneToOne(() => NoiDungChiSo, (noiDungChiSo) => noiDungChiSo.hauGiaTri,{nullable: true})
  @JoinColumn()
  tienGiaTri: NoiDungChiSo

  @Column({nullable: true})
  tienChuoi: string
  
  @Column({nullable: true})
  tienTo: string

  @Column({nullable: true})
  giaTri: number

  @Column({nullable: true})
  loaiGiaTri: string

  @Column({nullable: true})
  donVi: string

  @Column({nullable: true})
  hauChuoi: string

  @OneToOne(() => NoiDungChiSo, (noiDungChiSo) => noiDungChiSo.tienGiaTri,{nullable: true})
  hauGiaTri: NoiDungChiSo

  @Column({nullable: true})
  trangThai: string;

  

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayTao: string;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayCapNhat: string;

}