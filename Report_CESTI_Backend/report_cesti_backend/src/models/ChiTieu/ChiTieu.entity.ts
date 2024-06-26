import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../user/user.entity';
import { BieuMau } from '../BieuMau/BieuMau.entity';

@Entity()
export class ChiTieu {
  @PrimaryGeneratedColumn("increment")
  maChiTieu: number;

  @Column({unique: true})
  @Index({fulltext: true})
  tenChiTieu: string

  @Column({type: 'date'})
  @Index()
  batDau: string;

  @Column({type: 'date'})
  @Index()
  ketThuc: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayTao: string;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)" })
  ngayCapNhat: string;

  @Column()
  trangThai: string;

  @OneToMany(() => BieuMau, (bieuMau) => bieuMau.chiTieu)
  bieuMauAr: BieuMau[];
}