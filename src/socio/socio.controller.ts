import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { SocioService } from './socio.service';
import { plainToInstance } from 'class-transformer';
import { Socio } from './entities/socio.entity';
import { SocioDto } from './dto/socio.dto';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors.interceptor';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Post()
  async create(@Body() socioDto: SocioDto) {
    const socio = plainToInstance(Socio, socioDto);
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() socioDto: SocioDto) {
    const socio = plainToInstance(Socio, socioDto);
    return await this.socioService.update(id, socio);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.socioService.delete(id);
  }
}
