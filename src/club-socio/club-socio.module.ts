import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';

import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';

@Module({
  controllers: [ClubSocioController],
  providers: [ClubSocioService],
  imports: [TypeOrmModule.forFeature([Club, Socio])],
})
export class ClubSocioModule {}
