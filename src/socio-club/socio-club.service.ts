import { Injectable } from '@nestjs/common';
import { CreateSocioClubDto } from './dto/create-socio-club.dto';
import { UpdateSocioClubDto } from './dto/update-socio-club.dto';

@Injectable()
export class SocioClubService {
  create(createSocioClubDto: CreateSocioClubDto) {
    return 'This action adds a new socioClub';
  }

  findAll() {
    return `This action returns all socioClub`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socioClub`;
  }

  update(id: number, updateSocioClubDto: UpdateSocioClubDto) {
    return `This action updates a #${id} socioClub`;
  }

  remove(id: number) {
    return `This action removes a #${id} socioClub`;
  }
}
