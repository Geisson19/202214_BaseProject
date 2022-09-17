import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Socio } from '../../socio/entities/socio.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('date')
  fechaFundacion: Date;

  @Column()
  imageUrl: string;

  @Column({ length: 100 })
  descripcion: string;

  @OneToMany(() => Socio, (socio) => socio.club)
  socios: Socio[];
}
