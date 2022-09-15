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
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';
import { plainToInstance } from 'class-transformer';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Post()
  create(@Body() createClubDto: Club) {
    const club: Club = plainToInstance(Club, createClubDto);
    return this.clubService.create(createClubDto);
  }

  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClubDto: Club) {
    const club: Club = plainToInstance(Club, updateClubDto);
    return this.clubService.update(id, updateClubDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clubService.delete(id);
  }
}
