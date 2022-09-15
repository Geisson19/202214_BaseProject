import { Module } from '@nestjs/common';
import { SocioClubService } from './socio-club.service';
import { SocioClubController } from './socio-club.controller';

@Module({
  controllers: [SocioClubController],
  providers: [SocioClubService]
})
export class SocioClubModule {}
