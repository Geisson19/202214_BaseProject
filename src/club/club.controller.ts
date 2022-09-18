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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';
import { plainToInstance } from 'class-transformer';
import { ClubDto } from './dto/club.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Body() clubDto: ClubDto) {
    const club: Club = plainToInstance(Club, clubDto);
    return await this.clubService.create(club);
  }

  @Get()
  async findAll() {
    return await this.clubService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.clubService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clubDto: ClubDto) {
    const club: Club = plainToInstance(Club, clubDto);
    return await this.clubService.update(id, club);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.clubService.delete(id);
  }
}
