import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SocioService } from './socio.service';
import { plainToInstance } from 'class-transformer';
import { Socio } from './entities/socio.entity';

@Controller('socio')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  async create(@Body() createSocioDto: Socio) {
    const socio = plainToInstance(Socio, createSocioDto);
    return await this.socioService.create(socio);
  }

  @Get()
  async findAll() {
    return await this.socioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.socioService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSocioDto: Socio) {
    const socio = plainToInstance(Socio, updateSocioDto);
    return await this.socioService.update(id, socio);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.socioService.delete(id);
  }
}
