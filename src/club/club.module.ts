import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { Club } from './entities/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClubController],
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubService],
})
export class ClubModule {}
