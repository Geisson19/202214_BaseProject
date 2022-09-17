import { Module } from '@nestjs/common';
import { SocioModule } from './socio/socio.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './club/entities/club.entity';
import { Socio } from './socio/entities/socio.entity';
import { ClubSocioModule } from './club-socio/club-socio.module';

@Module({
  imports: [
    SocioModule,
    ClubModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'su123',
      database: 'postgres',
      entities: [Club, Socio],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    ClubSocioModule,
  ],
})
export class AppModule {}
