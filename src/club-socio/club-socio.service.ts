import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from '../club/entities/club.entity';
import { Socio } from '../socio/entities/socio.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ClubSocioService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepo: Repository<Club>,

    @InjectRepository(Socio)
    private readonly socioRepo: Repository<Socio>,
  ) {}

  /**
   * It adds a socio to a club
   * @param {string} clubId - string, socioId: string
   * @param {string} socioId - The id of the socio to add to the club
   * @returns The club with the new socio added to the socios array.
   */
  async addSocioToClub(clubId: string, socioId: string): Promise<Club> {
    const socio: Socio = await this.socioRepo.findOne({
      where: { id: socioId },
    });

    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    club.socios = [...club.socios, socio];
    return await this.clubRepo.save(club);
  }

  /**
   * "Find a club by its id, and return its socios."
   *
   * The first line of the function is a type annotation. It tells TypeScript that the function will
   * return a Promise of an array of Socio objects
   * @param {string} clubId - string - The id of the club we want to find the socios of.
   * @returns The socios of the club with the given id.
   */
  async findSociosFromClub(clubId: string): Promise<Socio[]> {
    const club: Club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return club.socios;
  }

  /**
   * It finds a socio from a club
   * @param {string} clubId - The id of the club that the socio belongs to.
   * @param {string} socioId - The id of the socio we want to find
   * @returns The socio with the given id that is associated to the club with the given id.
   */
  async findSocioFromClub(clubId: string, socioId: string): Promise<Socio> {
    const socio = await this.socioRepo.findOne({
      where: { id: socioId },
    });

    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clubSocio: Socio = club.socios.find((socio) => socio.id === socioId);

    if (!clubSocio)
      throw new BusinessLogicException(
        'The socio with the given id is not associated to the club',
        BusinessError.PRECONDITION_FAILED,
      );

    return clubSocio;
  }

  /**
   * It updates the socios of a club
   * @param {string} clubId - string - The id of the club to update
   * @param {Socio[]} socios - Socio[]
   * @returns A Club object
   */
  async updateSociosFromClub(clubId: string, socios: Socio[]): Promise<Club> {
    const club: Club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (const socio of socios) {
      const socioFound = await this.socioRepo.findOne({
        where: { id: socio.id },
      });

      if (!socioFound)
        throw new BusinessLogicException(
          'The socio with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    club.socios = socios;
    return await this.clubRepo.save(club);
  }

  /**
   * It deletes a socio from a club
   * @param {string} clubId - The id of the club to which the socio is associated
   * @param {string} socioId - The id of the socio to be deleted from the club
   * @returns The club with the socio removed.
   */
  async deleteSocioFromClub(clubId: string, socioId: string) {
    const socio: Socio = await this.socioRepo.findOne({
      where: { id: socioId },
    });

    if (!socio)
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: Club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clubSocio = club.socios.find(
      (storedSocio) => storedSocio.id === socio.id,
    );

    if (!clubSocio)
      throw new BusinessLogicException(
        'The socio with the given id is not associated to the club',
        BusinessError.PRECONDITION_FAILED,
      );

    club.socios = club.socios.filter((socio) => socio.id !== socioId);
    await this.clubRepo.save(club);
  }
}
