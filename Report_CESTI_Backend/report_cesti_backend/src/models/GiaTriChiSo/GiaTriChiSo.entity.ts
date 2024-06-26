import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { ChiSo } from '../ChiSo/ChiSo.entity';

@Entity()
export class GiaTriChiSo {
  @PrimaryGeneratedColumn("increment")
  maGiaTriChiSo: number;

  @ManyToOne(() => ChiSo, (chiSo) => chiSo.giaTriChiSoAr,{nullable: true, cascade: true, onDelete: "CASCADE"})
  chiSo: ChiSo;

  @OneToOne(() => GiaTriChiSo, (giaTriChiSo) => giaTriChiSo.hauGiaTri,{nullable: true})
  @JoinColumn()
  tienGiaTri: GiaTriChiSo

  @Column({nullable: true})
  tienChuoi: string
  
  @Column({nullable: true})
  tienTo: string

  @Column()
  giaTri: number

  @Column({nullable: true})
  loaiGiaTri: string

  @Column({nullable: true})
  donVi: string

  @Column({nullable: true})
  hauChuoi: string

  @OneToOne(() => GiaTriChiSo, (giaTriChiSo) => giaTriChiSo.tienGiaTri,{nullable: true})
  hauGiaTri: GiaTriChiSo

  @Column({nullable: true})
  trangThai: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayTao: string;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayCapNhat: string;

}