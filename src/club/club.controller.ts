import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';
import { plainToInstance } from 'class-transformer';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  async create(@Body() createClubDto: Club) {
    const club: Club = plainToInstance(Club, createClubDto);
    return await this.clubService.create(club);
  }

  @Get()
  async findAll() {
    return await this.clubService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clubService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClubDto: Club) {
    const club: Club = plainToInstance(Club, updateClubDto);
    return await this.clubService.update(id, club);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.clubService.delete(id);
  }
}
