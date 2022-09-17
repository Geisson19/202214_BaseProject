import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../../../../APIS/MISW4403_202214_Equipo06/src/shared/errors/business-errors';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  isDescriptionValid(club: Club) {
    return club.descripcion.length <= 100;
  }

  async create(club: Club) {
    if (!this.isDescriptionValid(club)) {
      return;
    }
    return await this.clubRepository.save(club);
  }

  async findAll() {
    return await this.clubRepository.find({ relations: ['socios'] });
  }

  async findOne(id: string) {
    const club: Club = await this.clubRepository.findOne({
      where: { id },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return club;
  }

  async update(id: string, club: Club) {
    const persistedClub: Club = await this.clubRepository.findOne({
      where: { id },
    });

    if (!persistedClub)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (!this.isDescriptionValid(club)) {
      return;
    }

    return await this.clubRepository.save({
      ...persistedClub,
      ...club,
    });
  }

  async delete(id: string) {
    const club: Club = await this.clubRepository.findOne({
      where: { id },
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return await this.clubRepository.remove(club);
  }
}
