import { Module } from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';
import { Club } from '../club/entities/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [ClubSocioController],
  providers: [ClubSocioService],
})
export class ClubSocioModule {}
