import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from '../../../src/socio/entities/socio.entity';
import { Club } from '../../../src/club/entities/club.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [Club, Socio],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([Club, Socio]),
];
