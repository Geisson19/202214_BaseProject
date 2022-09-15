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
    return this.socioService.create(socio);
  }

  @Get()
  async findAll() {
    return this.socioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.socioService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSocioDto: Socio) {
    const socio = plainToInstance(Socio, updateSocioDto);
    return this.socioService.update(id, socio);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.socioService.delete(id);
  }
}
