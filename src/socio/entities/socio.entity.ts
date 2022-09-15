import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from 'src/club/entities/club.entity';

@Entity()
export class Socio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column('date')
  fechaNacimiento: Date;

  @ManyToOne(() => Club, (club) => club.socios)
  club: Club;
}
