import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioController } from '../socio/socio.controller';
import { Socio } from './entities/socio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SocioController],
  imports: [TypeOrmModule.forFeature([Socio])],
  providers: [SocioService],
})
export class SocioModule {}
