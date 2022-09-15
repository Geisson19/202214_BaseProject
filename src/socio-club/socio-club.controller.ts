import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocioClubService } from './socio-club.service';
import { CreateSocioClubDto } from './dto/create-socio-club.dto';
import { UpdateSocioClubDto } from './dto/update-socio-club.dto';

@Controller('socio-club')
export class SocioClubController {
  constructor(private readonly socioClubService: SocioClubService) {}

  @Post()
  create(@Body() createSocioClubDto: CreateSocioClubDto) {
    return this.socioClubService.create(createSocioClubDto);
  }

  @Get()
  findAll() {
    return this.socioClubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socioClubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocioClubDto: UpdateSocioClubDto) {
    return this.socioClubService.update(+id, updateSocioClubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socioClubService.remove(+id);
  }
}
