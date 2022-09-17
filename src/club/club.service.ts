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

  /**
   * It returns true if the description of the club is less than or equal to 100 characters
   * @param {Club} club - Club - The club object that is being validated.
   * @returns A boolean value.
   */
  isDescriptionValid(club: Club) {
    return club.descripcion.length <= 100;
  }

  /**
   * If the description is valid, save the club
   * @param {Club} club - Club - this is the object that we are going to save in the database.
   * @returns The club object
   */
  async create(club: Club) {
    if (!this.isDescriptionValid(club)) {
      return;
    }
    return await this.clubRepository.save(club);
  }

  /**
   * It returns a list of all the clubs in the database, and for each club, it returns a list of all
   * the members of that club
   * @returns The clubRepository is being returned.
   */
  async findAll() {
    return await this.clubRepository.find({ relations: ['socios'] });
  }

  /**
   * It finds a club by its id and returns it
   * @param {string} id - string - The id of the club we want to find
   * @returns A club with the given id.
   */
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

  /**
   * It updates a club with the given id, if the club exists and the description is valid
   * @param {string} id - The id of the club to update
   * @param {Club} club - Club - the club object that we want to update
   * @returns The updated club
   */
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

  /**
   * It finds a club by id, and if it exists, it deletes it
   * @param {string} id - string - The id of the club to be deleted
   * @returns The club that was deleted
   */
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
