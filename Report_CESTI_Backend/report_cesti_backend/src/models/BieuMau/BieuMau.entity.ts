import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../user/user.entity';
import { ChiTieu } from '../ChiTieu/ChiTieu.entity';
import { ChiSo } from '../ChiSo/ChiSo.entity';

@Entity()
export class BieuMau {
  @PrimaryGeneratedColumn("increment")
  maBieuMau: number;
  
  @Column()
  @Index({fulltext: true})
  tenBieuMau: string;

  @Column({nullable: true})
  nhanXet: string;

  @ManyToOne(() => ChiTieu, (chiTieu) => chiTieu.bieuMauAr)
  chiTieu: ChiTieu

  @OneToMany(() => ChiSo, (chiSo) => chiSo.bieuMau)
  chiSoAr: ChiSo[]

  @CreateDateColumn({type:'timestamptz', default: () => "CURRENT_TIMESTAMP(6)"})
  ngayTao: string

  @UpdateDateColumn({type:'timestamptz', default: () => "CURRENT_TIMESTAMP(6)"})
  ngayCapNhat: string
}